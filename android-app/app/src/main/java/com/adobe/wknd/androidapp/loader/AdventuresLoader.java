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

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class AdventuresLoader extends AsyncTaskLoader<AdventureList> {

    public static final String PERSISTED_QUERY_NAME = "/wknd-shared/adventures-all";
    public static final String JSON_KEY_ADVENTURE_LIST = "adventureList";

    public final Map<String, Adventure> adventuresBySlug = new LinkedHashMap<>();

    public AdventuresLoader(Context context) {
        super(context);
        Log.i("AdventuresLoader", "context in loader constructor: " + context + " class " + context.getClass());
    }

    @Override
    public AdventureList loadInBackground() {

        try {
            Log.i("AdventuresLoader", "Loading adventures from   " + BuildConfig.AEM_HOST);
            AEMHeadlessClientBuilder builder = AEMHeadlessClient.builder().endpoint(BuildConfig.AEM_HOST);
            String user = BuildConfig.AEM_USER;
            String password = BuildConfig.AEM_PASSWORD;
            if (user != null && password != null) {
                builder.basicAuth(user, password);
            }
            AEMHeadlessClient client = builder.build();
            GraphQlResponse response = client.runPersistedQuery(PERSISTED_QUERY_NAME);

            JsonNode data = response.getData();

            ObjectMapper mapper = new ObjectMapper();

            AdventureList adventureList = mapper.treeToValue(data.get(JSON_KEY_ADVENTURE_LIST), AdventureList.class);

            for (Adventure adventure : adventureList) {
                adventuresBySlug.put(adventure.slug, adventure);
                Log.d("AdventuresLoader", "Loaded: " + adventure);
                RemoteImagesCache.getInstance().prepareDrawableFor(adventure.getPrimaryImagePath());
            }

            Log.i("AdventuresLoader", "Loaded  " + adventureList.items.size() + " adventures");

            return adventureList;

        } catch (Exception e) {
            Log.e("AdventuresLoader", "Error while loading Adventures: " + e, e);
            return null;
        }
    }


    public Map<String, Adventure> getAdventuresBySlug() {
        return adventuresBySlug;
    }

    public List<Adventure> getAdventures() {
        return new ArrayList<>(adventuresBySlug.values());
    }
}
