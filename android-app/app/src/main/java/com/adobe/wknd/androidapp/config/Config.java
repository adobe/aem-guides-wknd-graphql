package com.adobe.wknd.androidapp.config;

import android.content.Context;
import android.content.res.AssetManager;

import java.io.InputStream;
import java.util.Properties;

/**
 * Loads config from file /assets/config.properties.
 */
public class Config {
    public static final String CONFIG_FILE = "config.properties";

    public static final String CONFIG_KEY_CONTENT_API_ENDPOINT = "contentApi.endpoint";
    public static final String CONFIG_KEY_CONTENT_API_USER = "contentApi.user";
    public static final String CONFIG_KEY_CONTENT_API_PASSWORD = "contentApi.password";

    private final Properties properties;

    public Config(Context context) {
        properties = new Properties();
        AssetManager assetManager = context.getAssets();
        try {
            InputStream inputStream = assetManager.open(CONFIG_FILE);
            properties.load(inputStream);
        } catch (Exception e) {
            throw new IllegalStateException("Could not load " + CONFIG_FILE + ": " + e, e);
        }

    }

    public String getProperty(String key) {
        return properties.getProperty(key);
    }

    public String getContentApiEndpoint() {
        return getProperty(CONFIG_KEY_CONTENT_API_ENDPOINT);
    }

    public String getContentApiUser() {
        return getProperty(CONFIG_KEY_CONTENT_API_USER);
    }

    public String getContentApiPassword() {
        return getProperty(CONFIG_KEY_CONTENT_API_PASSWORD);
    }

}
