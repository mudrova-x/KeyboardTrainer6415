
export const getAllUsers = async () => {
    let usersMass = []
    console.log("ccreateUser")
    let response = await fetch('http://localhost:5000/api/user/getAll')
    if (response.ok) {
      // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа
        let users = await response.json();
        for (var e in users) {
            usersMass.push({
                    userName: users[e].login
            })
        }
        console.log(usersMass)
    return usersMass
        
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
}

export const createUser = async (user) => {
    const { login, password } = user
    console.log(login)
    console.log(password)
    let response = await fetch('http://localhost:5000/api/user/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
    let result = await response.json();
    console.log(result)
      //alert(result.message);
}

export const updateUser = async () => {
    
  }