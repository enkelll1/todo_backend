<h3>Steps to build </h3>
For starting :

git clone https://github.com/enkelll1/crispy_be_challenge_enkel-dervishi.git

Make sure you have docker installed and type in the main directory the commands below:

docker-compose build

...and after building write:

docker-compose up

Wait until the containers will be created 

<h3>Endpoints to try </h3>

Try with postman at http://localhost:8081

Authentication endpoint

<li>register(post)- http://localhost:8081/auth/register</li>
<li>login(post)- http://localhost:8081/auth/login</li>

Todos endpoint(Protected with jwt Bearer)

<li>create todo(post)- http://localhost:8081/todo</li>
<li>findall todo(get)- http://localhost:8081/todo</li>
<li>findone todo(get)- http://localhost:8081/todo/:id</li>
<li>updateone todo(patch)- http://localhost:8081/todo/:id</li>
<li>deleteone todo(delete)- http://localhost:8081/todo/:id</li> 
