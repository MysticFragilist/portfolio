import useWindowSize from "../hooks/use-windows";
import usePersistLocaleCookie from "../hooks/use-persist-locale-cookie";
import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage';
import { ReactTerminal } from "react-terminal";
import { i18n } from "../i18n"

function createAsciiArt() {
  return (<pre>
 ____ ____ ____ <br />
||p |||r |||e ||<br />
||__|||__|||__||<br />
|/__\|/__\|/__\|<br />
</pre>)
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
      <style css>{`
        .terminal {
          scrollbar-color: dark;
        }
      `}</style>
      <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #2D3139;
        color: #F9F9F9;
      }
      .cli {
        display: block;
        text-align: center;
        width: 100%;
        height: ${sizes.height *0.8}px;
        overflow: hidden;
      }
      .terminal {
        scrollbar-color: dark;
      }
      `}</style>
    </div>
  )
}