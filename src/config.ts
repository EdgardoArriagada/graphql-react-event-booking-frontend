interface EnvironmentVariables {
    BACKEND_URL: string;
}

interface ConfigVars {
    [key: string]: EnvironmentVariables;
}

const configVars: ConfigVars = {
    production: {
        BACKEND_URL: 'https://easy-event-0.herokuapp.com/',
    },
    development: {
        BACKEND_URL: 'http://localhost:3000',
    },
};

const getConfig = (environment: any): EnvironmentVariables => {
    return configVars[environment];
};

interface Config extends EnvironmentVariables {}

const config: Config = {
    // Add common config values here
    ...getConfig(process.env.REACT_APP_STAGE),
};

export default config;
