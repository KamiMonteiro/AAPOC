from rest_framework import permissions


class IsAdminOrAnonymousCreate(permissions.BasePermission):
    """
    Permissão que autoriza qualquer visitante (anônimo) a criar uma inscrição de voluntário (POST),
    mas exige autenticação de administrador (is_staff) para listar, consultar ou alterar dados (GET, PUT, PATCH, DELETE).
    """

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return bool(request.user and request.user.is_staff)
