package com.adobe.wknd.androidapp.loader;

import android.content.Context;
import android.util.Log;

import androidx.loader.content.AsyncTaskLoader;

import com.adobe.aem.graphql.client.AEMHeadlessClient;
import com.adobe.aem.graphql.client.AEMHeadlessClientBuilder;
import com.adobe.aem.graphql.client.GraphQlResponse;
import com.adobe.wknd.androidapp.BuildConfig;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class AdventureLoader extends AsyncTaskLoader<Adventure> {

    public static final String PERSISTED_QUERY_NAME = "/wknd-shared/adventure-by-slug";

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
        try {
            Log.i("AdventureLoader", "Loading adventure for slug " + this.slug + " from " + BuildConfig.AEM_HOST);
            AEMHeadlessClientBuilder builder = AEMHeadlessClient.builder().endpoint(BuildConfig.AEM_HOST);
            String user = BuildConfig.AEM_USER;
            String password = BuildConfig.AEM_PASSWORD;
            if (user != null && password != null) {
                builder.basicAuth(user, password);
            }
            AEMHeadlessClient client = builder.build();

            Map<String, Object> params = new LinkedHashMap<>();
            params.put("slug", this.slug);
            params.put("imageWidth", 600);
            params.put("imageQuality", 95);

            GraphQlResponse response = client.runPersistedQuery(PERSISTED_QUERY_NAME, params);

            JsonNode data = response.getData();

            ObjectMapper mapper = new ObjectMapper();

            this.adventure = mapper.treeToValue(data.get(JSON_KEY_ADVENTURE_LIST).get(JSON_KEY_ITEMS).get(0), Adventure.class);

            RemoteImagesCache.getInstance().prepareDrawableFor(adventure.getPrimaryImageSrc());

            Log.i("AdventureLoader", "Loaded adventure: " + adventure);

            return this.adventure;

        } catch (Exception e) {
            Log.e("MainActivity", "Error while loading adventure " + this.slug + " from " + BuildConfig.AEM_HOST, e);
            return null;
        }
    }

    public Adventure getAdventure() {
        return adventure;
    }
}
