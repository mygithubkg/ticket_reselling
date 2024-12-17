import React from "react";

function LoginPage(){
    return (
        <div>
            <form action="/register" method="POST">
              <div>
                <label for="email">Email</label>
                <input type="email"  name="username" />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password"  name="password" />
              </div>
              <button type="submit">
                Register
              </button>
            </form>
        </div>
    );
}

export default LoginPage;