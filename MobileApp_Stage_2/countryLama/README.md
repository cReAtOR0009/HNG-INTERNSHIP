<div align="center">
  <!-- <br />
    <a href="https://github.com/cReAtOR0009/HNG-INTERNSHIP/tree/master/MobileApp_Stage_2/countryLama" target="_blank">
      <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="CountryLama Banner">
    </a>
  <br /> -->

  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/-Redux-black?style=for-the-badge&logoColor=white&logo=redux&color=764ABC" alt="Redux" />
    <img src="https://img.shields.io/badge/-Expo-black?style=for-the-badge&logoColor=white&logo=expo&color=000020" alt="Expo" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="Tailwind CSS" />
  </div>

  <h3 align="center">CountryLama Mobile App</h3>

   <div align="center">
     Explore the world with this React Native app! Discover countries, filter by continent, time zone, and language, and enjoy a seamless user experience.
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🌍 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🚀 [Quick Start](#quick-start)
5. 🖼️ [Screenshots](#screenshots)
6. 🤝 [Contributing](#contributing)
7. 📄 [License](#license)

## 🌍 <a name="introduction">Introduction</a>

**CountryLama** is a mobile app built with **React Native** and **Redux Toolkit** that allows users to explore detailed information about countries worldwide. Whether you're a geography enthusiast or just curious about the world, this app provides a seamless and interactive experience for discovering countries, their flags, capitals, languages, and more.

Key highlights:

- **Search** for countries by name.
- **Filter** by continent, time zone, and language.
- **Dark/Light Theme** for personalized viewing.
- **Responsive Design** optimized for both iOS and Android.

<a href="https://github.com/cReAtOR0009/HNG-INTERNSHIP/tree/master/MobileApp_Stage_2/countryLama" target="_blank"><img src="![https://github.com/cReAtOR0009/HNG-INTERNSHIP/tree/master/MobileApp_Stage_2/countryLama/assets/images/Screens/Countrylama Home-.png](https://github.com/cReAtOR0009/HNG-INTERNSHIP/blob/4483fab99f7123dd25aed6ed60976a4bc27d171d/MobileApp_Stage_2/countryLama/assets/images/Screens/Countrylama%20Home-.png?raw=true)" /></a>

## ⚙️ <a name="tech-stack">Tech Stack</a>

- **Frontend**:

  - **React Native**: Cross-platform mobile app development.
  - **Expo**: Toolchain for React Native development.
  - **Redux Toolkit**: State management for countries, filters, and theme.
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **Expo Router**: Routing and navigation between screens.

- **Backend**:

  - **REST Countries API**: Free API for country data.

- **Development Tools**:
  - **ESLint**: Code linting and quality.
  - **Prettier**: Code formatting.
  - **Git**: Version control.
  - **Visual Studio Code**: Code Editor.

**Project structure**

```.
├── app
│   ├── (tabs)
│   ├── country
│   │   ├── [name].js
│   ├── index.js
│   ├── _layout.js
├── App.js
├── app.json
├── assets
│   ├── constants.js
│   │   ├── icons.js
│   ├── fonts
│   ├── icons
│   ├── images
│   │   ├── Screens
│   ├── index.js
├── babel.config.js
├── components
│   ├── Checkboxes.js
│   ├── Continents.js
│   ├── country
│   │   ├── CountryDetails.js
│   │   ├── CountryHeader.js
│   │   ├── CountryInfoRow.js
│   ├── Country.js
│   ├── CountryDetails.js
│   ├── EmptyList.js
│   ├── Languages.js
│   ├── SearchBox.js
│   ├── TimeZone.js
├── eas.json
├── global.css
├── index.js
├── metro.config.js
├── package-lock.json
├── package.json
├── README.md
├── redux
│   ├── features
│   │   ├── countrySlice.js
│   │   ├── filterSlice.js
│   │   ├── themeSlice.js
│   ├── store.js
├── tailwind.config.js
├── utils
│   ├── filterUtils.js
│   ├── groupCountries.js
```

**🔋CountryLama Features**:

- View a list of all countries grouped alphabetically.
- Search for countries by name.
- Filter by continent, time zone, and language.
- Toggle between **Light** and **Dark** themes.
- Change Language

- **Country Details**:

  - View detailed information about each country, including:
    - Official name.
    - Capital city.
    - Population.
    - Region and subregion.
    - Languages spoken.
    - Time zones.
    - Currency.
    - Flag.

- **Advanced Filtering**:

  - Combine multiple filters (e.g., search by name, filter by continent, and filter by language).
  - Reset filters to view the full list of countries.

- **Responsive Design**:

  - Optimized for both **iOS** and **Android** devices.
  - Smooth scrolling and performance, even with large datasets.

- **Offline Support**:
  - Persistently store theme preferences using **AsyncStorage**.

## 🚀 <a name="quick-start">Quick Start</a>

### Prerequisites

- **Node.js** (v16 or higher) installed on your machine.
- **Expo CLI** installed globally:
  ```bash
  npm install -g expo-cli
  ```

**Cloning the Repository:**

```bash
git clone https://github.com/cReAtOR0009/HNG-INTERNSHIP/tree/master/MobileApp_Stage_2/countryLama
cd explore-countries
```

**Install Dependencies:**

```bash
npm install
```

**Start the Development Server:**

```bash
expo start
```

**Run on a Device or Emulator:**
-Scan the QR code with the Expo Go app (available on iOS and Android).
-Alternatively, run on an emulator:.

```bash
expo start --android
```

    or

```bash
expo start --ios
```

### 🖼️Screenshots
<!-- 
<div style="display: flex; justify-content: space-between;">
  <div>
    <p>Home Screen</p>
    <img src="https://github.com/cReAtOR0009/HNG-INTERNSHIP/blob/4483fab99f7123dd25aed6ed60976a4bc27d171d/MobileApp_Stage_2/countryLama/assets/images/Screens/CountryLama%20Home.png?raw=true" alt="Home Screen" width="200">
  </div>
  <div>
    <p>Home Screen: Dark Theme</p>
    <img src="https://github.com/cReAtOR0009/HNG-INTERNSHIP/blob/4483fab99f7123dd25aed6ed60976a4bc27d171d/MobileApp_Stage_2/countryLama/assets/images/Screens/CountryLama%20dark%20Home.png?raw=true" alt="Country Details" width="200">
  </div>
  <div>
    <p>Country Details Screen</p>
    <img src="https://github.com/cReAtOR0009/HNG-INTERNSHIP/blob/4483fab99f7123dd25aed6ed60976a4bc27d171d/MobileApp_Stage_2/countryLama/assets/images/Screens/CountryLama%20%20country.png?raw=true" alt="Country Details" width="200">
  </div>
  <div>
    <p>Language Filter Screen</p>
    <img src="https://github.com/cReAtOR0009/HNG-INTERNSHIP/blob/4483fab99f7123dd25aed6ed60976a4bc27d171d/MobileApp_Stage_2/countryLama/assets/images/Screens/CountryLama%20language.png?raw=true" alt="Country Details" width="200">
  </div>
  <div>
    <p>Dark Theme Filter Screen</p>
    <img src="https://github.com/cReAtOR0009/HNG-INTERNSHIP/blob/4483fab99f7123dd25aed6ed60976a4bc27d171d/MobileApp_Stage_2/countryLama/assets/images/Screens/CountryLama%20Dark%20Filter.png?raw=true" alt="Dark Theme" width="200">
  </div>
</div> -->

### 🤝 Contributing

**We welcome contributions to improve the app! Here’s how you can contribute:**

**1. Fork the Repository:**

```bash
git clone https://github.com/cReAtOR0009/HNG-INTERNSHIP/tree/master/MobileApp_Stage_2/countryLama
```

**2. Create a New Branch:**

```bash
git checkout -b feature/your-feature-name
```

**3. Commit Your Changes:**

```bash
git commit -m "Add your commit message"git clone https://github.com/cReAtOR0009/HNG-INTERNSHIP/tree/master/MobileApp_Stage_2/countryLama
```

**4. Push to the Branch:**

```bash
git push origin feature/your-feature-name
```

**5. Open a Pull Request:**
-Describe your changes and why they are necessary.

### 📄 License

**This project is licensed under the MIT License. See the <a href="https://opensource.org/license/mit" target="_blank"> LICENSE file for details.**
