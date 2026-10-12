# NMT Portraits Recall
#### Video Demo: [https://youtu.be/OgnO7ZGh9nA?si=3JZDgIFrZiaj00F0](https://youtu.be/OgnO7ZGh9nA?si=3JZDgIFrZiaj00F0)
#### Description:
I am a Ukrainian high school student and I'm taking Ukrainian university entrance exam (NMT - National Multi-Subject Test). One of the three mandatory subjects is the history of Ukraine and the curriculum requires students taking this exam to know 54 historical figures. So I faced a problem: how to memorize the portraits, names and information about so many people? That's why I decided to choose the most memory-efficient way that helped me a lot in language learning - spaced repetition. This is precisely why I chose to create a spaced repetition app for learning NMT portraits as my final project.

#### First, let's take a look at the general structure of the application and then go through every file more carefully. 

The app is built with React Native framework and Expo Go. There are three main screens - Home(shows user's current and best streaks, has the learn new portraits and review portraits buttons), Database(this page displays the whole database (all 54 portraits). It renders buttons labeled with the names of historical figures and clicking a button opens a screen showing that person's portrait, name, and description. Also it has a search bar that lets users search for a specific figure) and Menu(this page has a button for toggling between day and night mode). Also there's a reusable flashcard component which is used in learn and review pages(more on its implementation and functions later). All the user's data is stored locally in AsyncStorage. 

As for the review alghorithm - I used Leitner algorithm based on boxes. There are six "boxes"  - the card is set to box 0 once user pressed "Learn It" button and it's available for review right away. If the user clicks "Got It" button, the card moves to the next box, if the user clicks "Missed It" button, the progress on this card resets and it gets set to the box 1.

The progression of boxes looks like this:

* Box 0 - review right after clicking the "Learn It" button
* Box 1 - review in a day
* Box 2 - review in 3 days
* Box 3 - review in a week
* Box 4 - review in 2 weeks
* Box 5 - review in a month(30 days)
* Box 6 - review in 2 months(60 days)

##### Now let's take a more detailed look at every page:
* __Portraits.ts__ - the database. This is a mock database which has only 20 portraits, but the full version should have 54 figures. They're stored in JSON object and its attributes are:
1. id(number,  it's a unique identifier used to look up or differentiate individual portraits);
2. name (string), image (require(...) is used here because if you only add a plain string link for the image, the React Native bundler will not save the image when user downloads the app. And the type of this attribute is a number, because that's what require returns);
3. description (string - general information about the historical figures you should know).

* __async_functions.tsx__ - the local storage. Its primary goal is storing the user's streak and each card's boxes. They're both stored in AsyncStorage. Cards are stored in AsyncStorage under "learned" key in an array of objects and each card has these attributes: 
1. id(number, it's essential, because without id the program won't find the corresponding portrait in portraits database to render the information about them);
2. reviewDate(number, the date for the next review);
3. box(number, the current box).

As for the streak - it's stored in an object with these attributes: current streak, best streak and last review. 

There are two similar functions in this file - *loadData* and *loadStreak* - as the name implies, they're used to load the data(either cards or streak) from async storage. 

Also there are two functions for working with user's cards - *storeLearned*(used in learn.tsx page and it saves portraits which user decided to learn) and *updateLearned* (used in review.tsx page and it updates a card and then stores in async storage) and two functions for streak - *updateStreak* and *resetStreak*(resets streak to zero while preserving the best streak if a user skipped a day of learning).

An important note - since async storage can only store a string, JSON.parse is used when pulling the data from async storage and then JSON.stringify is used for storing it back.

* __helpers.tsx__ - it has three functions: the first one is used for storing updated data(while learning or reviewing portraits) when user leaves the page and the second does the same but when the app goes to the background. And the third one gets date - gives you the current date which is formatted as year-month-day and it's used a lot in index.tsx.

At first, I wrote the functions leavePage and leaveApp separately in learn and review files, but then I realized that they do exactly the same thing, but take differenta arguments and that's one of the reasons why I created the helpers.tsx file.

* __learn.tsx__ - there's a const DATA that gets the whole portraits database and is used for rendering the information on the screen and getting id for managing async storage.

There are two useStates:
1. *Values* which stores the portraits user hasn't started learning yet. That's the portraits user sees during a session and if it's empty user sees the text "Everything is learned"
2. *LearnedThisSess* which stores the portraits user learned during the session. After user leaves the page/closes the app all the data from this array gets stored to async storage. I chose this implementation because useState is very fast and it makes user's experience feels smooth.

Also there are three use effect - first one loads the data from async storage and sets Values(useState) and two useeffects that handle storing the data and use leaveApp and leavePage functions from helpers.tsx.
If values aren't null, it means that there are "unlearned" cards so they get rendered through falshcard component. If the user presses "Learn It" button, the card moves to the LearnedThisSess and gets deleted from Values. If user presses "Learn later" the card moves to the end of Values array. 

* __review.tsx__ - the same as learn.tsx, it gets the DATA variable from portraits.ts and uses it for rendering the information on the screen and finding the corresponding portrait by its id. There are three useStates: 
1. *toReview* (stores the portraits that are due for review);
2. *reviewedThisSess* (stores the portraits the user reviewed during the session);
3. *wasUpdatedToday* (checks whether the user's streak has already been updated that day).

Also there's a *notDue* array stored in useRef. It has the portraits that aren't due yet but might become available for review during the current session(the cards whichever reviewDate is within next 12 hours).

There are four useEffects - the first one loads the learned portraits from async storage and separates them based on their review dates. If a portrait becomes due during the session, a timer moves it from notDue to toReview(with the help of timer). The second and third useEffects store the reviewed data when the user leaves the page or closes the app, using leavePage and leaveApp functions from helpers.tsx. The last one loads the current streak from async storage and checks whether it has already been updated today.

If toReview isn't null, the app checks whether there are any cards left to review. If the array is empty, the user sees the text "No review cards for now". Otherwise the first card in the array renders as a Flashcard component. If the user presses "Got it", the card moves to reviewedThisSess, and its box and review date get updated according to the spaced repetition algorithm. If the user presses "Missed it", the card's box and review date are reset to box 1 and the card moves to the end of toReview so the user can try again later. The streak is also updated the first time the user successfully review(presses got it) a card that day.

Important note - both review and learn pages share a similarity - the card rendered to the screen is the first card in the array, so all the manipulations are done with the zero indexed card.

###### Tabs folder:
* __index.tsx__ - this is the main (Home) screen. It displays the user's current and best streaks and has two buttons that let the  user navigate to the learn and review pages. There are two useState : *currentStreak*, which stores the user's streak data, and another one, *needReset*, which triggers a reload when the streak has to be reset(for example, user's last card review was earlier than yesterday). 

There are two hooks: useEffect(monitors the app state and checks whether the streak needs to be reset when the user returns to the app) and useFocusEffect (it loads the streak from async storage every time the screen is focused). If the streak data doesn't exist yet(user opens app for the first time), it creates a new object with the initial values and saves it to async storage.

* __portraits.ts__ and __[id].ts__ - this page renders the whole database and lets user search for portraits. It has a search bar where user can type the name of the person they need. If no matching name exists in the database, the screen says "no match". The placeholder in search bar says "Знайти портрет..."(it's Ukrainian language; it means "search for a portrait..."). If search bar is empty, the page displays the whole database. The page is scrollable because I used react native's component FlatList. [id].ts displays the details of an individual portrait selected by the user in portraits.ts.
* __menu.tsx__ - this page has only one button - "change the mode". It allows the user to switch between day and night mode. This function and color scheme were implemented using a tutorial by Codesistency. Link to the video: [https://youtu.be/G1XiiXTQHSE](https://youtu.be/G1XiiXTQHSE).

And lastly - __flashcard.tsx__ from the my_components folder. This is a reusable component used in learn and review pages. It displays a portrait and a button "Flip it" and after user presses it the card flips and reveals the person's name, description, and two buttons. The buttons' labels and functionality depend on the page - it's either "Learn It" and "Learn later" or "Got It" and "Missed It". After either button is pressed, the next card is rendered. The component uses React Native's Animated API to implement the flipping animation.