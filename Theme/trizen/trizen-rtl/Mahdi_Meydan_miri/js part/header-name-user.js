document.addEventListener("DOMContentLoaded", function () {
    
    let token = localStorage.getItem('Token');

    if(token){

        fetch('http://avatoop.com/marina_kish/api/users/ME', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.first_name && data.last_name){
                localStorage.setItem('id', data.id)
                let fullName = data.first_name + " " + data.last_name;
                
                loginAndSignUpDiv.classList.add('d-none');
                nameOfUserHeader.parentNode.classList.remove('d-none');
                nameOfUserHeader.innerHTML = `
                    <span class="la la-user form-icon font-size-24 mr-2"></span>
                    <span>${fullName}</span>
                `;  
            }else{
                localStorage.setItem('id', data.id)
                loginAndSignUpDiv.classList.add('d-none');
                nameOfUserHeader.parentNode.classList.remove('d-none');
                nameOfUserHeader.innerHTML = `
                    <span class="la la-user form-icon font-size-24"></span>
                    <span></span>
                `;
            }
        })
        .catch(error => {
            console.error('خطا در دریافت اطلاعات کاربر:', error);
        });
    }else{
        nameOfUserHeader.parentNode.classList.add('d-none');
    }
})