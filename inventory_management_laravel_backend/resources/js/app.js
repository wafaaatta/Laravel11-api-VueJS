import './bootstrap';
import Swal from 'sweetalert2';

const buttons = document.querySelectorAll('.user-delete');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            var uid = button.getAttribute('uid');
            if (result.isConfirmed) {
                var token = document.getElementById('token').value;
                axios({
                    method: 'DELETE',
                    url: '/api/v1/users/' + uid,
                    data: {
                        _token: token
                    },
                    headers: {
                        'X-CSRF-Token': token
                    }
                })
                .then(response => {
                    console.log(response.data);
                    location.reload();
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
            }
        })
    })
});