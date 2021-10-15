package com.adobe.wknd.androidapp.loader;

import android.content.Context;
import android.util.Log;

import androidx.loader.content.AsyncTaskLoader;

import com.adobe.aem.graphql.client.AEMHeadlessClient;
import com.adobe.aem.graphql.client.AEMHeadlessClientBuilder;
import com.adobe.aem.graphql.client.GraphQlResponse;
import com.adobe.wknd.androidapp.config.Config;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class AdventureLoader extends AsyncTaskLoader<Adventure> {

    public static final String QUERY_FILE_NAME = "adventureByPath.query";
    public static final String JSON_KEY_ADVENTURE_BY_PATH = "adventureByPath";
    public static final String JSON_KEY_ITEM = "item";
    private final String path;
    private Adventure adventure;

    public AdventureLoader(Context context, String path) {
        super(context);
        this.path = path;
        Log.i("AdventureLoader", "context in loader constructor: " + context + " class " + context.getClass());
    }

    @Override
    public Adventure loadInBackground() {

        Config config = new Config(getContext());

        try {
            Log.i("AdventureLoader", "Loading adventure for " + this.path + " from " + config.getContentApiEndpoint());
            AEMHeadlessClientBuilder builder = AEMHeadlessClient.builder().endpoint(config.getContentApiEndpoint());
            String user = config.getContentApiUser();
            String password = config.getContentApiPassword();
            if (user != null && password != null) {
                builder.basicAuth(user, password);
            }
            AEMHeadlessClient client = builder.build();

            String query = readFile(getContext(), QUERY_FILE_NAME);

            Map<String, Object> params = new HashMap<>();
            params.put("adventurePath", this.path);
            GraphQlResponse response = client.runQuery(query, params);

            JsonNode data = response.getData();

            ObjectMapper mapper = new ObjectMapper();

            this.adventure = mapper.treeToValue(data.get(JSON_KEY_ADVENTURE_BY_PATH).get(JSON_KEY_ITEM), Adventure.class);

            Log.i("AdventureLoader", "Loaded adventure: " + adventure);

            return this.adventure;

        } catch (Exception e) {
            Log.e("MainActivity", "Error while loading adventure " + this.path + " from " + config.getContentApiEndpoint(), e);
            return null;
        }

    }

    public Adventure getAdventure() {
        return adventure;
    }

    public String readFile(Context context, String file) {
        try (InputStream stream = context.getAssets().open(file)) {
            int size = stream.available();
            byte[] buffer = new byte[size];
            stream.read(buffer);
            stream.close();
            return new String(buffer);
        } catch (Exception e) {
            throw new IllegalStateException("Could not load file " + file + ": " + e, e);
        }
    }

}
