# Purdue Healthy Dining (Maintenance only) 
**An light-weight and smarter alternative to the official *Purdue Mobile Menus* app ,allowing Purdue students to eat healthier in the dining courts.**

- Counts calories, carbohydrates, fat and dietary fibers based on user-selected items on the menu.
- Recommends which foods to eat based on nutrition needs of each individual.
- Easy-to-understand pie charts showing nutrition info of meals.

**Get it on Google Play: https://play.google.com/store/apps/details?id=com.reprincipia.phd**

<img src="https://github.com/magickaiyang/purdue-healthy-dining/blob/master/information/Screenshot.png">

---

### Build Procedures for Developers
This app uses Ionic Framework (based on Angular), and is to be built by Capacitor to run on multiple platforms.

1. Get latest LTS version of Node.js
2. Clone the repository.
```
cd purdue-helthy-dining
npm install --save @capacitor/core @capacitor/cli
npx cap init
npx cap copy
npx cap open (opens native IDEs)
```
Remaining steps are platform dependent , and the app could be built for Android, iOS, UWP and Web.

---

### Functionalities
1. Find nutrition data for dishes
2. Calculation page and Cart page
3. Healthiness index algorithm to rank different combinations of foods
4. Suggestion page
5. Settings page

---

### Interaction Flow

<img src="https://github.com/magickaiyang/purdue-healthy-dining/blob/master/information/DesignFlowDraft.jpeg">

---

### Contributors

- Kaiyang Zhao 
- Yiheng Wu
- Aarushi
- Hyejin Kim 
- Eric Chen 
- Aastha Sinha
- Christopher Kok Kye Shyang 

---
