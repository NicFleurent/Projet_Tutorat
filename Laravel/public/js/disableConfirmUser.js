function confirmDisableUser(userId) {
    if (confirm("Êtes-vous sûr(e) de vouloir désactiver cet utilisateur ?")) {
        axios.put(`/users/desactiver/${userId}`, { Activer: false })
            .then(response => {
                alert(response.data.message);
                window.location.reload();
            })
            .catch(error => {
                alert("Une erreur s'est produite lors de la désactivation de l'utilisateur.");
            });
    }
}

//On ne peut pas supprimer