import useWindowSize from "../../hooks/use-windows";
import usePersistLocaleCookie from "../../hooks/use-persist-locale-cookie";
import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage';
import { ReactTerminal } from "react-terminal";
import { i18n } from "../../i18n"

function createAsciiArt() {
  const pythonCode = `
    _____                                 _   __  __                _                     _                    _  _   
   / ____|                               | | |  \\/  |              | |                   | |                  | || |  
  | (___    __ _  _ __ ___   _   _   ___ | | | \\  / |  ___   _ __  | |_  __ _  _ __ ___  | |__    __ _  _   _ | || |_ 
   \\___ \\  / _\` || '_ \` _ \\ | | | | / _ \\| | | |\\/| | / _ \\ | '_ \\ | __|/ _\` || '_ \` _ \\ | '_ \\  / _\` || | | || || __|
   ____) || (_| || | | | | || |_| ||  __/| | | |  | || (_) || | | || |_| (_| || | | | | || |_) || (_| || |_| || || |_ 
  |_____/  \\__,_||_| |_| |_| \\__,_| \\___||_| |_|  |_| \\___/ |_| |_| \\__|\\__,_||_| |_| |_||_.__/  \\__,_| \\__,_||_| \\__|
  `;

  return (<pre>{pythonCode}</pre>)
}

async function createExperiencesCommand(locale, t) {
  const res = await fetch('/api/data')
  const data = await res.json();
  const evalData = JSON.parse(data);
  console.log(evalData);
  const rows = [];
  for (let i = 0; i < evalData.experiences.length; i++) {
    rows.push(
      <tr>
        <td><code>{evalData.experiences[i].business}</code></td>
        <td>{evalData.experiences[i].title}</td>
        <td dangerouslySetInnerHTML={{__html: evalData.experiences[i].description}} />
        <td>{evalData.experiences[i].startDate+' > '+evalData.experiences[i].endDate}</td>
      </tr>);
  }
  return (<table>
    <tr>
      <th>Company</th>
      <th>Title</th>
      <th>Description</th>
      <th>Dates</th>
    </tr>
    {rows}
  </table>)
}

async function createProjectsCommand(locale, t) {
  const res = await fetch('/api/data')
  const data = await res.json();
  const evalData = JSON.parse(data);
  console.log(evalData);
  const rows = [];
  for (let i = 0; i < evalData.projects.length; i++) {
    rows.push(
      <tr>
        <td><code>{evalData.projects[i].name}</code></td>
        <td>{evalData.projects[i].repository}</td>
        <td>{evalData.projects[i].description}</td>
        <td>{evalData.projects[i].lastUpdated}</td>
      </tr>);
  }
  return (<table>
    <tr>
      <th>Name</th>
      <th>Repository</th>
      <th>Description</th>
      <th>Last Updated</th>
    </tr>
    {rows}
  </table>)
}
async function createLanguageCommand(locale, t, paramLang) {
  if (!paramLang || paramLang === "") {
    // Toggle if none is passed as parameters
    console.log(i18n)
    var localeToggle = locale === "fr" ? "en" : "fr";

    await setLanguage(localeToggle);

    return (<p style={{ display: "inline" }}>{t('commands.change-lang', { locale: localeToggle })}</p>);
  } else if (paramLang === "en" || paramLang === "fr") {
    // Set to the param lang
    await setLanguage(paramLang);

    return (<p style={{ display: "inline" }}>Change to {paramLang} locale successfully!</p>);
  }

  return (<p style={{ color: "red" }}>Error while changing locale</p>);
}

function commandDescription(commandName) {
  if(commandName === "whoami") {
    return (<tr><td><code>whoami</code>&emsp;</td><td>Check the user of this site.</td></tr>)
  } else if(commandName === "language" || commandName === "lang") {
    return (<tr><td><code>language</code>&emsp;</td><td>Change the language of this site.</td></tr>)
  } else if(commandName === "experiences" || commandName === "exp") {
    return (<tr><td><code>experiences</code>&emsp;</td><td>Show the experiences of this portfolio.</td></tr>)
  } else if(commandName === "projects") {
    return (<tr><td><code>projects</code>&emsp;</td><td>Show the projects of this portfolio.</td></tr>)
  } else {
    return (<p style={{ display: "inline" }}>For more information on a specific command, type <code>help `command-name`</code>.
              <table>
                {commandDescription("whoami")}
                {commandDescription("lang")}
                {commandDescription("exp")}
                {commandDescription("projects")}
              </table>
            </p>);
  }
}

function createCommands(locale, t) {
  return {
    help: (commandName) => {
      return commandDescription(commandName)
    },
    whoami: () => (<p style={{ display: "inline" }}>{createAsciiArt()}Samuel Montambault<br />MysticFragilist</p>),
    language: (lang) => createLanguageCommand(locale, t, lang),
    lang: (lang) => createLanguageCommand(locale, t, lang),
    exp: () => createExperiencesCommand(locale, t),
    experiences: () => createExperiencesCommand(locale, t),
    projects: () => (createProjectsCommand(locale, t)),
  };
}


export default function Terminal() {
  var sizes = useWindowSize();
  const { t, lang } = useTranslation('cli');
  usePersistLocaleCookie();

  const commands = createCommands(lang, t);

  return (
    <div className="container">
      <div className="cli">
        <h2>{t('title')}</h2>
        <ReactTerminal
          commands={commands}
          theme="material-dark"
          prompt="sam@cli 👉"
          welcomeMessage={ <p>Welcome to Sam CLI! If you don&apos;t know what to do, try the command <code>help</code></p>}
          showControlButtons={false}
          errorMessage={
            () => (<p style={{ color: "red", display: "inline" }}>Invalid command found, try the command <code>help</code> to find all available commands.</p>)
          }
        />
      </div>

      
      <style jsx>{`
      .container {
        height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        color: #F9F9F9;
      }
      .cli {
        display: block;
        text-align: center;
        width: 100%;
        height: ${sizes.height *0.8}px;
        overflow: hidden;
      }

      #terminalEditor {
        height: calc(100% - 66px);
      }

      .terminal {
        scrollbar-color: dark;
      }
      `}</style>
    </div>
  )
}