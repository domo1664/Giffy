### GIFFY
This is a Giphy clone using the Giphy api

---
### HEROKU URL
https://giffy-dom.herokuapp.com/

---
### WIREFRAMES
![WF1](/wireframes/wireframe1.JPG?raw=true)

![WF2](/wireframes/wireframe2.JPG?raw=true)

---

### TECH
I used npm fetch to grab the urls in my express routes and pg promise to process the data
on that url. I also used forms on the client side to communicate with the server side by 
passing data from the form through ajax to a virtual page that the user never sees. This allowed
me to grab that information from the virtual page on the server side and store it in a global
scope variable to used by other functions. Which allows user input to communicate with the api
used on the server side. In the client side javascript a shorthand ajax was used 
"$.post('hhtp://some_url.com')" to send the user's input to the virtual page. Also equally
interesting the server side technology to connect this virtual page was an express post
route. In the beginning this was super confusing. In hindsight, the post on the client side
creates the data in a page and the post on the server side grab the info from said virtual page
and adds that info to the server. NEW DEVELOPMENTS !!!
I also used that same process to grab data that was passed from the api on the server side.
Then, send it to the client side in html and grab it with a post route in the client side javascript. Finally to send that information back to the server side to be added to a database
created by yours truly. I like to call it the express ajax circle of life. That process was
used to insert, and delete information.


---
## OBSTACLES
Realizing I was doing a click function on an array of html elements with the id of the 
element instead of class. I literally spent hours wracking my brain for broken server code
or client side or jquery and I heard Bryan's voice in my head saying "When manipulating the DOM
if you use id it only grabs the first element." And then came EUREKA!!!! 

---

##  USER STORIES

### STORY 1
 As a college student with too much time to procrastinate I want to be able to 
 breaks from class work and find entertaining gifs. 


---

### STORY 2
As a serious business man I want to be able to help my collegues with some
light humor. I want to be able to search for random gifs that are none stop funny.







