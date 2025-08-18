
        // function to handle the user input of the word 
        function checkPalindrome(event) { 
            // prevent the form from submitting
            event.preventDefault();

            //  create a shortcut to the txtword user input 
            let userInput = document.getElementById("txtWord").value;

            //  create a shortcut to the div where we will display the results
            let divPalinResults = document.getElementById("divPalinResults");

            //  set up a variable to hold the result of the palindrome check
            let isPalin = isPalindrome(userInput);
            
            //  this is equivalent to isPalin == true 
            if(isPalin) {
                divPalinResults.textContent = userInput + " is a palindrome!";
            }
            else {
                divPalinResults.textContent = userInput + " is not a palindrome.";
            }
            


        }
        // function to check if the word is a palindrome
        function isPalindrome(stringToTest){ 
            stringToTest = stringToTest.toLowerCase();

            //  set up a variable to reverse the contents of 
            let stringToReverse = stringToTest.toLowerCase();

             // Remove spaces and punctuation so phrases can work
            stringToTest = stringToTest.replace(/[^a-z0-9]/g, "");



            //  convert the string, so take "Rae" convert to an array where each letter is in its own slot 
            //  reverse the contents of our new array, so now we have "e" "a" "R" 
            //  then join the array so it becomes a string again - "eaR" 

            stringToReverse = stringToReverse.split("").reverse().join("");
            // compare the original string to the backwards string


            if(stringToTest === stringToReverse) {
                 return true;
            }

            return false; 
                


        }

        // console.log("radar=" + isPalindrome("radar"));
        // console.log("test=" + isPalindrome("test"));
        // console.log("radar" + isPalindrome("radar"));

     