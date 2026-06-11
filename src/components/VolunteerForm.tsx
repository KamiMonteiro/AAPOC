import { type ChangeEvent, type FormEvent, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WHATSAPP_NUMBER = "+555565999162284";

type FormFields = {
  name: string;
  birthDate: string;
  contact: string;
  instagram: string;
  address: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

// Formata telefone: (65) 99999-9999 ou (65) 9999-9999
const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

// Garante que o @ esteja no início do Instagram
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
    if (age < 16 || age > 100) errors.birthDate = "Idade deve ser entre 16 e 100 anos.";
  }

  const digits = form.contact.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) {
    errors.contact = "Informe um telefone válido com DDD. Ex: (65) 99999-9999";
  }

  if (form.instagram && form.instagram.length < 2) {
    errors.instagram = "Instagram inválido.";
  }

  if (!form.address.trim()) {
    errors.address = "Informe o endereço.";
  }

  return errors;
};

const VolunteerForm = () => {
  const [form, setForm] = useState<FormFields>({
    name: "",
    birthDate: "",
    contact: "",
    instagram: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormFields) => (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (field === "contact") value = formatPhone(value);
    if (field === "instagram") value = formatInstagram(value);

    setForm((prev) => ({ ...prev, [field]: value }));

    // Limpa o erro do campo ao editar
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const message =
      `Olá AAPOC, gostaria de me voluntariar.%0A%0A` +
      `Nome completo: ${encodeURIComponent(form.name)}%0A` +
      `Data de nascimento: ${encodeURIComponent(form.birthDate)}%0A` +
      `Contato: ${encodeURIComponent(form.contact)}%0A` +
      `Instagram: ${encodeURIComponent(form.instagram || "Não informado")}%0A` +
      `Endereço: ${encodeURIComponent(form.address)}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3" type="button">
          Quero ser voluntário
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Formulário de Voluntário</DialogTitle>
          <DialogDescription>
            Preencha seus dados e envie pelo WhatsApp para se candidatar como voluntário.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>

          <div className="grid gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Seu nome completo"
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input
              id="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange("birthDate")}
            />
            {errors.birthDate && <p className="text-xs text-destructive">{errors.birthDate}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact">Contato</Label>
            <Input
              id="contact"
              value={form.contact}
              onChange={handleChange("contact")}
              placeholder="(65) 99999-9999"
              inputMode="numeric"
            />
            {errors.contact && <p className="text-xs text-destructive">{errors.contact}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="instagram">
              Instagram <span className="text-muted-foreground text-xs">(opcional)</span>
            </Label>
            <Input
              id="instagram"
              value={form.instagram}
              onChange={handleChange("instagram")}
              placeholder="@seuusuario"
            />
            {errors.instagram && <p className="text-xs text-destructive">{errors.instagram}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={form.address}
              onChange={handleChange("address")}
              placeholder="Rua, número, bairro, cidade"
            />
            {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Enviar pelo WhatsApp</Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerForm;