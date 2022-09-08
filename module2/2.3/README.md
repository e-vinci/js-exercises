# Boilerplate pour vos applications modernes utilisant Webpack
## How to use ?
- Si vous ne l'avez pas fait, vous pouvez cloner le repo associé au boilerplate pour initier votre application : `git clone https://github.com/e-vinci/js-basic-boilerplate.git` ou `git clone https://github.com/e-vinci/js-basic-boilerplate.git nom-de-votre-projet` pour créer votre projet nommé `nom-de-votre-projet`.
- **package.json** est le fichier de configuration de votre projet. Veuillez le mettre à jour afin de :
    - donnnez un nom à votre projet & une description ;
    - vous identifier comme auteur.
- ⚡ Si vous avez cloné votre projet au sein d'un repo existant, Git ne trackera pas ce nouveau projet ; en effet, Git ne tracque pas des projets Git dans des projets Git.
Pour vous assurer que Git traque votre nouveau projet imbriqué dans un repo, vous devez effacer le répertoire **.git** se trouvant dans votre nouveau projet. N'hésitez pas aussi à effacer **.gitignore** se trouvant dans votre nouveau projet.
- Par contre, si vous souhaitez créer un nouveau repo à l'aide de votre boilerplate, 
vous pouvez utiliser le **.gitignore** existant. Vous pouvez aussi éventuellement utiliser le 
**.git**, mais cela signifie que vous hériterez de tous les changements associés au boilerplate, 
et que vous devrez changer l'origine (`git remote remove origin`, `git remote add origin LINK_TO_YOUR_REPO`). Nous vous recommandons plutôt d'effacer le répertoire **.git** et de 
réinitialiser un projet git (`git init`, `git remote add origin LINK_TO_YOUR_REPO`).
- Installation des dépendances et démarrage du boilerplate : 
```shell
cd js-basic-boilerplate # (ou le nom donné au répertoire de votre projet)
npm i # (equivalent de npm install)
npm start
```

## Utilisation du linter et du formater
- Pour bénéficier de feedback sur le code lors de son écriture, par rapport au respect du style 
des règles d'Airbnb, vous devez avoir installé l'extension **ESLint** au sein de VS Code. 
- Pour que la configuration du formater offerte dans ce boilerplate soit utile, 
vous devez avoir installé l'extension **prettier** au sein de VS Code.
- vous pouvez facilement formatter votre code conformément au style d'Airbnb :
    - soit en tapant **Shift Alt F** ;
    - soit en faisant un clic droit sur votre script, **Format Document** ; la première fois, il se peut que vous deviez sélectionner **prettier** comme formater.
- Pour info, la configuration des règles de **ESLint** se fait dans le fichier 
**.eslintrc.js** devant se trouver à la racine d'un projet et offert au sein du boilerplate.
- Pour info, la configuration des règles de **prettier** se fait dans le fichier 
**.prettierrc.js** devant se trouver à la racine d'un projet et offert au sein du boilerplate.

## How to ? Ajout d'un package
- Installation d'un package : `npm i nomDuPackage`
Pour plus d'info sur un package, ou pour trouver un package traitant d'un sujet qui vous intéresse : https://www.npmjs.com
- Modification du code pour l'utiliser, au sein de `/src/index.js` (ou tout autre module .js) : chargement de la librairie soit via `import` (ou `require`) du package. Généralement, les instructions d'installation et d'utilisation d'un package sont données sur le site de https://www.npmjs.com.
- Si quelqu'un souhaite installer et exécuter ce projet, la gestion des dépendances est très simple : copie du répertoire du projet (sans `node_modules`), `npm instal`, `npm start`. Il n'y a donc pas de librairies à gérer manuellement pour reprendre le projet d'un tiers.

## Utilisation d'assets (images, fonts, CSS...)
- Attention, quand vous utilisez des assets au sein de votre application, comme des images, l'URL d'un asset après le build de votre application n'est pas la même qu'avant le build. 
- Pour bien gérer les URL au sein de votre JavaScript, vous devez d'abord importer vos assets. Voici un exemple pour ajouter une image dynamiquement au sein d'un footer : 
```javascript
import logo from '.src/img/icon.png';
const footerPhoto = new Image(); // or document.createElement('img');
footerPhoto.src = logo;
footerPhoto.height = 50;
const footer = document.querySelector("footer");
footer.appendChild(footerPhoto);
```
- Plus d'information sur la gestion des assets via Webpack : https://webpack.js.org/guides/asset-management/ 
## Conclusion
- L'utilisation de ce boilerplate permet d'avoir un serveur de développement hyper performant, de développer avec beaucoup de confort, de faciliter la structure d'un projet, de gérer les dépendances, de transformer les assets de manière centralisée, de détecter certaines erreur 
lors de l'écriture de code (ESLint) ...

# Resources
- favicon : https://upload.wikimedia.org/wikipedia/commons/3/3e/AIGA_information.svg, AIGA (American Institute of Graphic Arts)
