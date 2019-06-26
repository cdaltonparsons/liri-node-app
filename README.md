In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. 


![giphy demo](/images/giphy.gif)

The code for this app is organized into a switch case that will trigger certain functions to run depending on how the user answers the inquirer prompt.  It utilizes several npm packages, including inquirer, a node spotify api package, axios, moment, and fs.

To use the app, simply follow the inquirer prompts in the terminal.  Liri has four built in functions.  You can chose to get information on a song through the spotify function, find the next conert a given artist is playing using the bands in town api, or give information on a provided movie using the OMDb api.  The fourth function reads information in a .txt file and runs one of the previously listed functions depending on the contents of that file.