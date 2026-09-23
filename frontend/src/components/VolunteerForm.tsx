import { type ChangeEvent, type FormEvent, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CheckCircle2, HeartHandshake, Loader2, MessageCircle } from "lucide-react";
import { cadastrarVoluntario, ApiError } from "@/lib/api";

const WHATSAPP_NUMBER = "+555565999162284";

type FormFields = {
  name: string;
  birthDate: string;
  contact: string;
  instagram: string;
  address: string;
  howToHelp: string;
  termoLgpd: boolean;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const formatInstagram = (value: string) => {
  const clean = value.replace(/\s/g, "");
  if (!clean) return "";
  return clean.startsWith("@") ? clean : `@${clean}`;
};

const validateForm = (form: FormFields): FormErrors => {
  const errors: FormErrors = {};

  if (!form.name.trim() || form.name.trim().split(" ").length < 2) {
    errors.name = "Informe o nome completo (nome e sobrenome).";
  }

  if (!form.birthDate) {
    errors.birthDate = "Informe a data de nascimento.";
  } else {
    const birth = new Date(form.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    if (age < 16 || age > 100) errors.birthDate = "O candidato deve ter entre 16 e 100 anos.";
  }

  const digits = form.contact.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) {
    errors.contact = "Informe um telefone válido com DDD (10 ou 11 dígitos).";
  }

  if (!form.address.trim()) {
    errors.address = "Informe o endereço ou bairro em Cuiabá/Várzea Grande.";
  }

  if (!form.howToHelp.trim()) {
    errors.howToHelp = "Conte-nos como você deseja contribuir.";
  }

  if (!form.termoLgpd) {
    errors.termoLgpd = "Você deve concordar com os termos de privacidade para continuar.";
  }

  return errors;
};

const VolunteerForm = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [form, setForm] = useState<FormFields>({
    name: "",
    birthDate: "",
    contact: "",
    instagram: "",
    address: "",
    howToHelp: "",
    termoLgpd: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = () => {
    setForm({
      name: "",
      birthDate: "",
      contact: "",
      instagram: "",
      address: "",
      howToHelp: "",
      termoLgpd: true,
    });
    setErrors({});
    setIsSuccess(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(resetForm, 200);
    }
  };

  const handleChange =
    (field: keyof FormFields) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value: any = event.target.value;
      if (field === "contact") value = formatPhone(value);
      if (field === "instagram") value = formatInstagram(value);

      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Envia os dados para a API Django
      await cadastrarVoluntario({
        nome_completo: form.name.trim(),
        data_nascimento: form.birthDate,
        telefone: form.contact.trim(),
        instagram: form.instagram.trim() || undefined,
        endereco: form.address.trim(),
        como_deseja_ajudar: form.howToHelp.trim(),
        termo_lgpd_aceito: form.termoLgpd,
      });

      setIsSuccess(true);
      toast.success("Inscrição gravada no sistema da AAPOC com sucesso!");
    } catch (error: any) {
      if (error instanceof ApiError && error.errors) {
        // Mapeia erros vindos da validação do Django para o formulário
        const backendErrors: FormErrors = {};
        if (error.errors.nome_completo) backendErrors.name = Array.isArray(error.errors.nome_completo) ? error.errors.nome_completo[0] : String(error.errors.nome_completo);
        if (error.errors.data_nascimento) backendErrors.birthDate = Array.isArray(error.errors.data_nascimento) ? error.errors.data_nascimento[0] : String(error.errors.data_nascimento);
        if (error.errors.telefone) backendErrors.contact = Array.isArray(error.errors.telefone) ? error.errors.telefone[0] : String(error.errors.telefone);
        if (error.errors.endereco) backendErrors.address = Array.isArray(error.errors.endereco) ? error.errors.endereco[0] : String(error.errors.endereco);
        if (error.errors.como_deseja_ajudar) backendErrors.howToHelp = Array.isArray(error.errors.como_deseja_ajudar) ? error.errors.como_deseja_ajudar[0] : String(error.errors.como_deseja_ajudar);
        if (error.errors.termo_lgpd_aceito) backendErrors.termoLgpd = Array.isArray(error.errors.termo_lgpd_aceito) ? error.errors.termo_lgpd_aceito[0] : String(error.errors.termo_lgpd_aceito);
        setErrors(backendErrors);
      }
      toast.error(error.message || "Erro ao conectar com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsAppFollowUp = () => {
    const message =
      `Olá AAPOC, acabei de me inscrever pelo site como voluntário(a)!%0A%0A` +
      `Nome: ${encodeURIComponent(form.name)}%0A` +
      `Contato: ${encodeURIComponent(form.contact)}%0A` +
      `Como desejo ajudar: ${encodeURIComponent(form.howToHelp)}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="mt-6 rounded-full px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-all" type="button">
          <HeartHandshake className="mr-2 h-5 w-5" />
          Quero ser voluntário
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold text-foreground">
                Inscrição de Voluntário
              </DialogTitle>
              <DialogDescription>
                Preencha seus dados para fazer parte da equipe de voluntários da AAPOC. Seus dados serão enviados com segurança para nossa equipe de coordenação.
              </DialogDescription>
            </DialogHeader>

            <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Seu nome completo"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="birthDate">Data de nascimento *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={form.birthDate}
                    onChange={handleChange("birthDate")}
                    disabled={isSubmitting}
                  />
                  {errors.birthDate && <p className="text-xs text-destructive">{errors.birthDate}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contact">Telefone / WhatsApp *</Label>
                  <Input
                    id="contact"
                    value={form.contact}
                    onChange={handleChange("contact")}
                    placeholder="(65) 99999-9999"
                    disabled={isSubmitting}
                  />
                  {errors.contact && <p className="text-xs text-destructive">{errors.contact}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="instagram">Instagram (opcional)</Label>
                  <Input
                    id="instagram"
                    value={form.instagram}
                    onChange={handleChange("instagram")}
                    placeholder="@seu_perfil"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Endereço / Bairro *</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={handleChange("address")}
                    placeholder="Bairro, Cidade - MT"
                    disabled={isSubmitting}
                  />
                  {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="howToHelp">Como você deseja ajudar? *</Label>
                <textarea
                  id="howToHelp"
                  className="flex min-h-[90px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                  placeholder="Ex: Sou profissional da área de [profissão], posso ajudar na produção de eventos, logística, artesanato, bazar..."
                  value={form.howToHelp}
                  onChange={handleChange("howToHelp")}
                  disabled={isSubmitting}
                />
                {errors.howToHelp && <p className="text-xs text-destructive">{errors.howToHelp}</p>}
              </div>

              {/* Termo de Privacidade / LGPD */}
              <div className="pt-2">
                <div className="flex items-start space-x-3 rounded-lg border border-border/60 bg-muted/30 p-3">
                  <Checkbox
                    id="termoLgpd"
                    checked={form.termoLgpd}
                    onCheckedChange={(checked) => {
                      setForm((prev) => ({ ...prev, termoLgpd: Boolean(checked) }));
                      if (errors.termoLgpd) setErrors((prev) => ({ ...prev, termoLgpd: undefined }));
                    }}
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="termoLgpd"
                    className="text-xs text-muted-foreground leading-snug cursor-pointer select-none"
                  >
                    Autorizo a AAPOC a registrar e utilizar meus dados exclusivamente para contato e triagem das ações de voluntariado, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                  </label>
                </div>
                {errors.termoLgpd && <p className="text-xs text-destructive mt-1">{errors.termoLgpd}</p>}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <DialogClose asChild>
                  <Button variant="outline" type="button" disabled={isSubmitting}>
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gravando...
                    </>
                  ) : (
                    "Enviar Inscrição"
                  )}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground">
                Inscrição Concluída!
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed max-w-sm mx-auto">
                Muito obrigado pelo seu gesto de amor e solidariedade, <strong>{form.name}</strong>! Seus dados foram salvos com sucesso em nosso sistema e nossa coordenação entrará em contato em breve.
              </p>
            </div>

            <div className="bg-muted/40 rounded-xl p-4 border border-border/60 text-left text-xs space-y-1">
              <p className="font-semibold text-foreground">Resumo do Cadastro:</p>
              <p className="text-muted-foreground"><strong>Telefone:</strong> {form.contact}</p>
              <p className="text-muted-foreground"><strong>Área de apoio:</strong> {form.howToHelp}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <Button
                variant="outline"
                onClick={openWhatsAppFollowUp}
                className="gap-2 text-emerald-700 border-emerald-300 hover:bg-emerald-50"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                Falar no WhatsApp agora
              </Button>
              <Button onClick={() => setOpen(false)}>
                Fechar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerForm;