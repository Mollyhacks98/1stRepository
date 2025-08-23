 function validateForm() {
                // create a shortcut/nickname for the first name that the user entered 
                let firstName = document.getElementById("txtFirstName").value; 
                // create a shortcut/nickname for the last name that the user entered
                let lastName = document.getElementById("txtLastName").value;
                // create a shortcut/nickname for the zip code that the user entered
                let zip = document.getElementById("txtzip").value;

                console.log("firstName: " + firstName);
                console.log("lastName: " + lastName);
                console.log("Zip Code: " + zip); 

                // CREATE A NEW VARIABLE TO HOLD BOTH THE FIRST AND LAST NAME 
                let fullName = firstName + " " + lastName;

                console.log("fullName="  + fullName);
                //  create a shortcut to the message area 
                let divMessage = document.getElementById("divMessage");

//  i created the error ,essage for if the fullname has either 1 character (" ") or more than 20 
                if (fullName.length == 1 || fullName.length > 20) {
                    //  the user gets notiified of the eror but doesnt get the message
                    divMessage.innerHTML = "Invalid name. Please try again."; 


                }
                // If its not 5 digits long its not a zipcode
                else if  (zip.length != 5){ 
                    divMessage.innerHTML = "Invalid zip code. Please try again.";

                }
                // If we get to this else statement, it means all of the inputs validated successfully!
                else { 
                    // The inputs validated successfully 
                    divMessage.innerHTML = "Welcome," + fullName + "!The Secret word is validation!"; 
                             }


                // This will prevent the form from submitting to server side code that we dont have in this class
                return false; 
            }