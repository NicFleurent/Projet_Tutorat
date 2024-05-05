function confirmDeleteUser(userId) {
    if (confirm("Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ?")) {
        axios.delete(`/users/${userId}`)
            .then(response => {
                alert(response.data.message);
                window.location.reload();
            })
            .catch(error => {
                alert("Une erreur s'est produite lors de la suppression de l'utilisateur.");
            });
    }
}