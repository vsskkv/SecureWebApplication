# SecureWebApplication

## Made using:

- [AMP] Apache | MySql | PHP
- HTML
- CSS
- Js

## Brief:

Simple website hosted using basic AMPP server. This site used Bootstrap to format the page. 

### Step 1:
Set up AMPPS whitch is a serverside hosting service to view files locally. Also i used vscode to edit the files since its streamline and light weight. The way i added the files to the web hosting server is by using a file transfer protocol called file zilla, this is a client version where i can connect to the host and send my files there so its hosted. For the actual hosting i used 000webhost.com, this is a free simple hosting site that hosted the file for the program/app.  

### Step 2:
To Start the projecct i had to firest start my linux server system [AMPPS] for this i made sure that Apache and MySQL is running so i can 1 host the site and 2 start making a my sql database. After i had to start writing some code. The code is basic HTML code with in page JavaScript using the tag <script> </script>. Inside the tags was a like function to loop through a array of a arrays and display the infomation in a table form using the tags for a table but inside .js by printing the table tags inside the html page. 

### Step 3:
For this stage i set up my wesb host and made sure thatt he file transfer protocol was one. This allow me to sue filezilla tyo access the host and uplad the raw php and HTML files to it. This lead me to be able to connect the site to the FTP client, using the site manager. For a test i simply uplodded a app1 and then went to the site to see if it was there and after it was this meant that the connection was sucessful. 

### Step 4:
So sine we need a DB this meant that i had to make one in SQL this was simple since the PHPMyAdmin had mySQL built in so i could use that to create a DB then a table of users. But i had to set up a Admin account so that the the DB was secure and this reuired me to genergat e a strong password so basic web attacks such as brutal force could be prevented. After this was set up i made sure i could read write and delete the DB tables and infomation. Then after to connect the DB to the site in raw HTML form i started to make a connection usinf PDO. this was simply giving it the infomation that would give it admin access to the DB. After this itv ws time to create the tables so that i could populate it with infomation of the users so the first table made was the user ones. This table had a Primry key of Id that would auto increment that measn that i could then be able to change the key of the users. The nect and final table that was made was the URS this was so i could store urls of the thinsg that the loged in users could access.  
