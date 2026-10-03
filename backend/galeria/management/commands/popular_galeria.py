import re
from pathlib import Path
from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
from django.utils import timezone
from galeria.models import FotoGaleria


class Command(BaseCommand):
    help = "Importa automaticamente todas as fotos legadas de momentos da AAPOC para o banco de dados da Galeria"

    def handle(self, *args, **options):
        public_img_dir = settings.BASE_DIR.parent / "frontend" / "public" / "img"
        if not public_img_dir.exists():
            self.stderr.write(self.style.ERROR(f"Diretório não encontrado: {public_img_dir}"))
            return

        # Busca todos os arquivos que começam com 'momentos'
        arquivos = list(public_img_dir.glob("momentos*.jpeg")) + list(public_img_dir.glob("momentos*.jpg"))

        def extrair_numero(p: Path):
            numeros = re.findall(r"\d+", p.stem)
            return int(numeros[0]) if numeros else 0

        arquivos.sort(key=extrair_numero)

        self.stdout.write(f"Encontradas {len(arquivos)} fotos de momentos para verificar...")

        criadas = 0
        existentes = 0

        for idx, arquivo in enumerate(arquivos, start=1):
            nome_arquivo = arquivo.name
            titulo = f"Momento AAPOC #{idx}"
            
            # Verifica se já foi cadastrada anteriormente
            ja_existe = FotoGaleria.objects.filter(imagem__icontains=nome_arquivo).exists() or \
                        FotoGaleria.objects.filter(titulo=titulo).exists()

            if ja_existe:
                existentes += 1
                continue

            with open(arquivo, "rb") as f:
                foto = FotoGaleria(
                    titulo=titulo,
                    descricao="Ação de acolhimento e assistência aos pacientes oncológicos e suas famílias.",
                    data_evento=timezone.localdate(),
                    link_instagram="https://www.instagram.com/aapoc.oficial/",
                    ordem=idx,
                    ativo=True,
                )
                # Salva o arquivo de imagem no storage configurado
                foto.imagem.save(nome_arquivo, File(f), save=True)
                criadas += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Concluído com sucesso! {criadas} fotos importadas para a Galeria ({existentes} já existiam)."
            )
        )
