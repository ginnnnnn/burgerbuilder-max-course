<div style="text-align:center;">
<h1>how to use</h1>


<p>modify the axios-order.js change the base Url to your firebase url</p>
<p> set your api key in action folder >auth.js </p>
<p> set your ingedients init in firebase </p>
<p> my set up is ingredients:{bacom:0,cheese:0,salad:0,meat:0}</p>
<p>enable your firebase rule to </p>
<p>  {
  "rules":{
    "ingredients":{".read":"true"
      ,".write":"true"},
    "orders":{
      ".read":"auth  != null",
      ".write":"auth != null",
        ".indexOn":["userId"]
    }
  }
}</p>
 
<p>run npm start</p>
</br>
<strong>npm package</strong></br>
create-react-app cli</br>
react</br>
redux</br>
redux-thunk</br>
axios</br>
firebase</br>
css module</br>

I add a little bit React lazy just for fun
</div>
