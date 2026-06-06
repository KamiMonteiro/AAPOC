import { type ChangeEvent, type FormEvent, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WHATSAPP_NUMBER = "+5565992875506"; // substitua pelo número real com DDD e código do país

const VolunteerForm = () => {
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    contact: "",
    instagram: "",
    address: "",
  });

  const handleChange = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = `Olá AAPOC, gostaria de me voluntariar.%0A%0ANome completo: ${encodeURIComponent(
      form.name,
    )}%0AData de nascimento: ${encodeURIComponent(form.birthDate)}%0AContato: ${encodeURIComponent(
      form.contact,
    )}%0AInstagram: ${encodeURIComponent(form.instagram)}%0AEndereço: ${encodeURIComponent(form.address)}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank");
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
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input
              id="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange("birthDate")}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact">Contato</Label>
            <Input
              id="contact"
              value={form.contact}
              onChange={handleChange("contact")}
              placeholder="Telefone ou WhatsApp"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={form.instagram}
              onChange={handleChange("instagram")}
              placeholder="@seuusuario"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={form.address}
              onChange={handleChange("address")}
              placeholder="Seu endereço"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Enviar pelo WhatsApp</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerForm;
