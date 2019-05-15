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

interface Config extends EnvironmentVariables {
    getGraphqlUrl: () => string;
}

const config: Config = {
    ...getConfig(process.env.REACT_APP_STAGE),

    // Add common config values here
    getGraphqlUrl: function() {
        return this.BACKEND_URL + '/graphql';
    },
};

export default config;
