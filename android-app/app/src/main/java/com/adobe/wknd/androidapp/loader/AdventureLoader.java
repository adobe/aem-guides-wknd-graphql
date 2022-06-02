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

    public static final String PERSISTED_QUERY_NAME = "/wknd/adventure-by-slug";

    public static final String JSON_KEY_ADVENTURE_LIST = "adventureList";
    public static final String JSON_KEY_ITEMS = "items";
    
    private final String slug;
    private Adventure adventure;

    public AdventureLoader(Context context, String slug) {
        super(context);
        this.slug = slug;
        Log.i("AdventureLoader", "context in loader constructor: " + context + " class " + context.getClass());
    }

    @Override
    public Adventure loadInBackground() {

        Config config = new Config(getContext());

        try {
            Log.i("AdventureLoader", "Loading adventure for slug " + this.slug + " from " + config.getContentApiEndpoint());
            AEMHeadlessClientBuilder builder = AEMHeadlessClient.builder().endpoint(config.getContentApiEndpoint());
            String user = config.getContentApiUser();
            String password = config.getContentApiPassword();
            if (user != null && password != null) {
                builder.basicAuth(user, password);
            }
            AEMHeadlessClient client = builder.build();

            Map<String, Object> params = new HashMap<>();
            params.put("slug", this.slug);

            GraphQlResponse response = client.runPersistedQuery(PERSISTED_QUERY_NAME, params);

            JsonNode data = response.getData();

            ObjectMapper mapper = new ObjectMapper();

            this.adventure = mapper.treeToValue(data.get(JSON_KEY_ADVENTURE_LIST).get(JSON_KEY_ITEMS).get(0), Adventure.class);

            Log.i("AdventureLoader", "Loaded adventure: " + adventure);

            return this.adventure;

        } catch (Exception e) {
            Log.e("MainActivity", "Error while loading adventure " + this.slug + " from " + config.getContentApiEndpoint(), e);
            return null;
        }
    }

    public Adventure getAdventure() {
        return adventure;
    }
}
