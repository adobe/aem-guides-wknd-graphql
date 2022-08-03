// Defines the Headless Service object w/ properties
const aemHeadlessService = {
  aemHost: "https://publish-p65804-e666805.adobeaemcloud.com",
  graphqlAPIEndpoint: "graphql/execute.json",
  projectName: "my-project",
  persistedQueryName: "person-by-name",
  queryParamName: "name",
};

//AEM credentials object if connecting to AEM-Author Service, not needed for publish service
const aemCredentials = {
  username: "",
  password: "",
};

//Person Info HTML block which will be added as HTML Template and appended to shadow DOM upon JSON Value replacements
let personInfoHTML = `
  <div class="person">
    <img
      class="person_image"
      src="{IMG-SRC}"
      alt="{FULL-NAME}"
    />
    <div class="person_occupations">
      {OCCUPATION}
    </div>
    <div class="person_content">
      <h1 class="person_full-name">{FULL-NAME}</h1>
      <div class="person_biography">{BIOGRAPHY-TEXT}</div>
    </div>
  </div>
`;

// Create a Class for our Custom Element (person-info)
class PersonInfo extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    const shadowRoot = this.attachShadow({ mode: "open" });

    // init Shadow DOM specific CSS
    this.initStyles();
  }

  // lifecycle callback :: When custom element is appended to document
  connectedCallback() {
    // get attribute values from the 'person-info' custom element
    const host = this.getAttribute("host");
    const queryParamValue = this.getAttribute("query-param-value");

    const headlessAPIURL = this.buildHeadlessAPIURL(host);
    console.log(`Using AEM Headless API URL:${headlessAPIURL}`);

    this.fetchPersonByNamePersistedQuery(headlessAPIURL, queryParamValue).then(
      ({ data, err }) => {
        if (err) {
          console.log("Error while fetching data");
        } else if (data?.personList?.items.length === 1) {
          this.renderPersonInfoViaTemplate(data.personList.items[0], host);
          //this.renderPersonInfoViaReplace(data.personList.items[0], host);
          //this.renderPersonInfoViaDocumentAPIs(data.personList.items[0], host);
        } else {
          console.log(`Cannot find person with name: ${queryParamValue}`);
        }
      }
    );
  }

  async fetchPersonByNamePersistedQuery(headlessAPIURL, queryParamValue) {
    let data;
    let err;

    //encode URI params
    const encodedParam = encodeURIComponent(
      `;${aemHeadlessService.queryParamName}=${queryParamValue}`
    );

    const fetchOptions = this.buildFetchOptions();

    try {
      // Make XHR call to AEM
      const response = await fetch(
        `${headlessAPIURL}/${aemHeadlessService.persistedQueryName}${encodedParam}`,
        fetchOptions
      );

      if (!response.ok) {
        console.log('ERROR:Could not load data from AEM');
      }

      // Get JSON response
      const responseData = await response.json();

      // The GraphQL data is stored on the response's data field
      data = responseData?.data;
      
    } catch (e) {
      // An error occurred, return the error messages
      error = e
        .toJSON()
        ?.map((error) => error.message)
        ?.join(", ");
      console.error(e.toJSON());
    }

    return { data, err };
  }

  buildHeadlessAPIURL(host) {
    let headlessAPIURL = "";

    // If host is passed via Custom Element attribute, else use default value from 'aemHeadlessService.aemHost'
    if (host) {
      headlessAPIURL = [
        host,
        aemHeadlessService.graphqlAPIEndpoint,
        aemHeadlessService.projectName,
      ].join("/");
    } else {
      headlessAPIURL = [
        aemHeadlessService.aemHost,
        aemHeadlessService.graphqlAPIEndpoint,
        aemHeadlessService.projectName,
      ].join("/");
    }

    return headlessAPIURL;
  }

  buildFetchOptions() {
    let fetchOptions;

    if (aemCredentials.username && aemCredentials.password) {
      const credentials = btoa(
        `${aemCredentials.username}:${aemCredentials.password}`
      );

      fetchOptions = {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      };
    }

    return fetchOptions;
  }

  renderPersonInfoViaTemplate(person, host){

    const personTemplateElement = document.getElementById('person-template');

    const templateContent = personTemplateElement.content;

    const personImgElement = templateContent.querySelector('.person_image');
    personImgElement.setAttribute('src', host + person.profilePicture._path);
    personImgElement.setAttribute('alt', person.fullName);

    const personFullNameElement = templateContent.querySelector('.person_full-name');
    personFullNameElement.textContent = person.fullName;

    const personBioElement = templateContent.querySelector('.person_biography');
    personBioElement.textContent = person.biographyText.json[0].content[0].value;

    const personOccupationsElement = templateContent.querySelector('.person_occupations');
    personOccupationsElement.innerHTML = '';

    person.occupation.map((occupationItem, index) => {
      personOccupationsElement.innerHTML =  `${personOccupationsElement.innerHTML}<span class="person_occupation">${occupationItem}</span>`; 
    });

    this.shadowRoot.appendChild(templateContent.cloneNode(true));
  }



  renderPersonInfoViaReplace(person, host){

    personInfoHTML = personInfoHTML.replaceAll('{FULL-NAME}', person.fullName);
    personInfoHTML = personInfoHTML.replaceAll('{IMG-SRC}', host + person.profilePicture._path);
    personInfoHTML = personInfoHTML.replaceAll('{BIOGRAPHY-TEXT}', person.biographyText.json[0].content[0].value);

    person.occupation.map((occupationItem, index) => {
      personInfoHTML = personInfoHTML.replace('{OCCUPATION}', `<span class="person_occupation">${occupationItem}</span>{OCCUPATION}`);
    });
    
    personInfoHTML = personInfoHTML.replaceAll('{OCCUPATION}', '');

    const divElement = document.createElement('div');
    divElement.innerHTML = personInfoHTML;
    this.shadowRoot.appendChild(divElement);
  }

  renderPersonInfoViaDocumentAPIs(person, host) {
    //create Person (div) element
    const personDivElement = document.createElement("div");
    personDivElement.setAttribute("class", "person");

    //create Image element and append to Person (div)
    const imageElement = document.createElement("img");
    imageElement.setAttribute("class", "person_image");
    imageElement.setAttribute("src", host + person.profilePicture._path);
    imageElement.setAttribute("alt", person.fullName);
    personDivElement.appendChild(imageElement);

    //create Occupation (div + span) element and append to Person (div)
    const occupationDivElement = document.createElement("div");
    occupationDivElement.setAttribute("class", "person_occupations");

    person.occupation.map((occupationItem, index) => {
      const occupationSpanElement = document.createElement("span");

      occupationSpanElement.setAttribute("class", "person_occupation");
      occupationSpanElement.innerText = occupationItem;
      occupationDivElement.appendChild(occupationSpanElement);
    });
    personDivElement.appendChild(occupationDivElement);

    // create Person-Content (div) element
    const personContentDivElement = document.createElement("div");
    personContentDivElement.setAttribute("class", "person_content");

    // create Full-Name (h1) element and append to Person-Content (div)
    const fullNameElemement = document.createElement("h1");
    fullNameElemement.setAttribute("class", "person_full-name");
    fullNameElemement.textContent = person.fullName;
    personContentDivElement.appendChild(fullNameElemement);

    // create Person-Bio (div) element and append to Person-Content (div)
    const personBioDivElement = document.createElement("div");
    personBioDivElement.setAttribute("class", "person_biography");
    personBioDivElement.innerText =
      person.biographyText.json[0].content[0].value;
    personContentDivElement.appendChild(personBioDivElement);

    // Append Person-Content (div) element to Person (div)
    personDivElement.appendChild(personContentDivElement);

    // Append Person (div) to shadow DOM
    this.shadowRoot.appendChild(personDivElement);
  }

  // Define and apply this Person Info Specific Styles
  initStyles() {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
        .person {
            position: relative;
            margin-bottom: 2rem;
        }
          
        .person .person_image {
            width: 100%;
            height: 400px;
            object-fit: cover;
            object-position: center;
        }
          
        .person .person_occupations {
            position: absolute;
            top: 0;
            right: 0;
        }
          
        .person .person_occupation {
            background-color: #FFEA00;
            padding: 1rem 1.5rem;
            display: inline-block;
            margin: 1rem 1rem 0 0;
            text-transform: uppercase;
            font-weight: bold;
        }
          
        .person .person_content {
            margin: -9rem 10% 0 10%;
            background-color: white;
            position: relative;
            padding: 1rem 2rem;
        }
          
        .person .person_content .person_full-name {
            margin-bottom: 2rem;
        }
        `;

    console.log(`Added Styles`);
    this.shadowRoot.appendChild(styleElement);
  }
}


// Create and add 'person-template' to the document as IIFE
(() => {
  
  let personTemplateElement = document.getElementById('person-template');

  if(!personTemplateElement){

    personTemplateElement = document.createElement('template');
    personTemplateElement.setAttribute('id', 'person-template');
    personTemplateElement.innerHTML = personInfoHTML;

    document.body.append(personTemplateElement);

  }else{
    console.log('Template is present, no need to add again');
  }
})();

// Define the person-info element
customElements.define("person-info", PersonInfo);
