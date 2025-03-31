# Milestone Project 2: Gothenburg Playgrounds

## Table of contents

- [Introduction to project](#introduction-to-project)
- [Preliminary project overview](#preliminary-project-overview)
  - [Searching](#searching)
  - [Detailed information](#detailed-information)
  - [Other possible functions to add](#other-possible-functions-to-add)
  - [Pros and cons of project](#pros-and-cons-of-project)
- [Goals](#goals)
- [Overview of users and needs](#ovewview-of-users-and-needs)
- [User stories](#user-stories)
- [Discussion of user stories](#discussion-of-user-stories)
- [Basic design of website and page requirements](#basic-design-of-website-and-page-requirements)
- [Alternative outlines considered or tried](#alternative-outlines-considered-or-tried)
- [Wireframes](#wireframes)
- [Colors and fonts](#colors-and-fonts)
- [Deloyment](#deloyment)
- [Testing](#testing)
- [Finished website](#finished-website)
- [Credits](#credits)

## Introduction to project

The idea for this project is to make a simple web page (more advanced styling and graphics funtion could be added after project comlpetion, as long as the page functions on both mobiles and computers) to let parents search for playgrounds in Gothenburg depending on different criteria.  
The idea is to make this a live webpage after the completion of the project.

## Preliminary project overview

This preliminary project overview was written to outline the basic scope of the project and present this to mentor and others to discuss the feasability of the project. After discussion of project idea, functions, pros and cons, a more detailed project documentation was started to document the implementation of the website.

### Searching
The page would for this purpose hold a number of playgrounds, stored in JavaScript objects. When a user search for playgrounds they choose what kind of movement they want to do with their kid(s), size of the playground and part of the city. The program then searches through the list to find those that matches the search criteria.  
An overview list would be presented.

### Detailed information
When clicking on one of the found playgrounds the user will be presented with additional information, such as an overview picture, a short description, and adress/location. Several options for presentation is possible, either using literals to construct the html code or adding innerHTML to already constructed web items.

### Other possible functions to add
- Pick a random playground
- Present the page in both english and swedish, and toggle this with small flag icons
- Integrate APIs such as weather forcasts and travel information (how to get there with public transport) or Map Services

### Pros and cons of project
The following aspects were discussed with mentor Spencer Barriball before settling on the project.
- **The project is heavily dependant on having a large enough list of playgrounds to be usable.**  
Around 10 playgrounds in three different parts of the city would probably be sufficient for project requirements. More information could be added later.
- **Will there be enough variation with Javascript functions to show experience and programming skills?**  
After discussing of what functions would be included we where in agreement that there would be plenty of options to show profeciency in Java Script, including but not necessarily limited to searching object depending user input, creating dynamic html to show search result, possible inclusion of external API and more.
- **Would this project be better suited for later milestones, as when databases are involved?**  
This sort of project would probably normally depend on databases to store information about different playgrounds, rather than hard-code that information into Javascript code. However, the work required to make the project work is still very relevant to this part of the course. Also, since the plan is to take this project live after the assignment, using databases instead of JS could though make it harder to make a live webpage, depending on hosting options. Also, the work made for this assignment could be used as a basis when making alternations in the future.
- **Risk of getting too involved in HTML/CSS**  
With extra styling after project completion, this should make a really nice portfolio project. However, since the focus here is Javascript and dynamic webpages much of the design that normally would be made can be implemented afterwards, or as low-priority tasks if time permits. This will be featured in the User cases and their respective priority.

## Goals

**Primary:** Help parents or custodians of children 1-3 years old choose playgrounds suitable the childrens gross motor skill development. Theese motor skills are 14 in total, and will for user interface and search purposes be grouped into three categories:  
- Ground work (lift your head, rolling, belly crawl, crawl, support)
- On your feet (balance, walk, run, jump, coordination, throw/catch, cross movement)  
- In the air (swing, hang and climb)

**Secondary:** Make parents or custodians more aware of childrens physical development, discover new playgrounds and explore new areas of Gothenburg

## Ovewview of users and needs

### Who will be using it?

Parents or custodians with toddlers, age 1-3, who are looking for playgrounds. 

### What do the primary users need from the website?

Be able to find a playground suitable for the movement they want to practice with their kid or kids, either nearby or in other parts of Gothenburg. Some may also appreciate a function to randomly pick a playground if they don't know where they want to go on a particular day.

## User stories

Github Projects is used to keep track of User stories and completion of them. The checkboxes marked in this ReadMe are those tasks or critera that has been met upon submission of project.

### User story 1, Responsive user-friendly website
As a visitor to the site, the webpage should be accessible to visit from all plattforms. Searching should be intuitive and results presented clearly.

**Criteria**  
[ ] Responsive website  
[ ] User friendly  
**Tasks**  
[ ] Create a responsive website using Bootstrap grid  
[ ] Make sure all information is presented easily and clearly  
**Priority:** Must-have

### User story 2, Easy to use search function
As a visitor to the site, search form should be easy to find and use

**Criteria**  
[ ] Search form among the first items to meet user  
[ ] Search function must be easy to use and understand, even without previous knowledge of toddlers motor functions
[ ] Clear overview of search results and specific details, including a message if no playgrounds were found  
**Tasks**  
[ ] Include search form immediately on index page (after banner/hero image)  
[ ] Group search form content in an easy and understandable way
[ ] Present "hit list" overview  
[ ] Include a "no results found" message  
[ ] Present details of clicked "hits", either in new window, below search list, temporarily above search list (either main window or modal). Will test feasibility with Wireframes and real testing  
**Priority:** must-have

### User story 3, Describe toddlers motor function and development
As a parent or custodian, information about different motor skills and development will give a greater understanding of their children(s) physical development.

**Criteria**  
[ ] Easy-to-understand information about motor skills and how they are grouped in the search function  
**Tasks**  
[ ] Provide seperate window or modal with information about motor skills and how they are grouped  
**Priority:** should-have

### User story 4, Different language options
As an immigrant or tourist, information in other languages than Swedish would be usefull.

**Criteria**  
[ ] Being able to use the page and understand all information on website
**Tasks**  
[ ] Construct the website using English, but make it possible to user to switch between English and Swedish  
[ ] Make Swedish the default language, even though every English text is already present.
**Priority:** should-have

### User story 5, Pleasing html and css
As a developer, one want the project look pleasing and attractive as well as being fully functional, before using it as portfolio project or going live with it

**Criteria**  
[ ] Portfolio-ready website  
**Tasks**  
[ ] Add additional html and css styling and functionality to improve look of website

**Priority:** could-have
### User story 6, Pick a playground at random
As a parent who really don't can come up with ideas of what to do a particular day, a nice feature would be to let the website pick a playground at random.

**Criteria**  
[ ] Being able to pick a playground at random  
**Task**  
[ ] Implement a function to pick a playground at random, regardless of search criteria  
**Priority:** could-have


## Discussion of User stories

**Asthetics**
For the scope of this project, the focus is on Javascript and functionality. Therefore, the webpage constructed for User Story 1, Responsive user-friendly website should focus on the functionality of the page on different plattforms (computer, tablet, mobile) and to provide just a idea of how a finished website would look. All other styling that does not relate to functionaly should be implemented as the last could-have priority, either before submission or after but before project going live and/or being used in portfolio.

**Language**
In a real life situation, the webpage would be developed with Swedish content first, English (and potentially other languages) second. Due to the class being held in English and criteria regarding this, this project will be done the other way around. If more than one language is implemented before project submission, Swedish should be made the default language but switching to English should be easy and intuitive

## Basic design of website and page requirements

- Index page with search function, "hit list" and detailed overview of items selected from "hit list". Wireframe mock-up and real testing will decide how much information can be handled at once and if fields should be hidden at times, or information should be shown in modals

## Alternative outlines considered or tried

- Using a seperate details page for displaying information about as specific playground choosen from the hit list and sending information with querystrings. Mentor Spencer Barriball advocate all information being presented on a single page. This decreases the likelihood of errors, querystring manipulation and also removes the need to construct javascript objects several times. Onces everything is read into memory on index page, it stays there as long as the visitor remains on the page.

## Wireframes

## Colors and fonts

## Javascript object and data structure

## Deloyment

## Testing

## Finished website

## Credits

- Kara Fairchild, for coming up with the project idea, gathering required informaton, taking pictures, testing and evaluation.
- Spencer Barriball, Code Institute mentor, for support, evaluation of ideas and important guidance.
