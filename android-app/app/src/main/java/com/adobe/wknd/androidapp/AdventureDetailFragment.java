package com.adobe.wknd.androidapp;

import android.os.Bundle;
import android.text.Html;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.loader.app.LoaderManager;
import androidx.loader.content.Loader;

import com.adobe.wknd.androidapp.databinding.FragmentAdventureDetailBinding;
import com.adobe.wknd.androidapp.loader.Adventure;
import com.adobe.wknd.androidapp.loader.AdventureLoader;
import com.adobe.wknd.androidapp.loader.RemoteImagesCache;
import com.google.android.material.appbar.CollapsingToolbarLayout;

public class AdventureDetailFragment extends Fragment implements LoaderManager.LoaderCallbacks<Adventure> {

    /**
     * The fragment argument contains the path of the adventure
     */
    public static final String ARG_ITEM_ID = "item_id";

    private Adventure adventure;

    private CollapsingToolbarLayout adventureDetailToolbar;
    private ImageView adventureDetailImage;
    private TextView adventureDetailTextView;

    private FragmentAdventureDetailBinding binding;

    private String itemId;

    public AdventureDetailFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments().containsKey(ARG_ITEM_ID)) {

            this.itemId = getArguments().getString(ARG_ITEM_ID);
            Log.i("AdventureDetailFragment", "Received itemId in detail view: " + this.itemId);
        }

        LoaderManager.getInstance(this).initLoader(0, null, this).forceLoad();

    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        binding = FragmentAdventureDetailBinding.inflate(inflater, container, false);
        View rootView = binding.getRoot();

        adventureDetailToolbar = rootView.findViewById(R.id.toolbar_layout);
        adventureDetailImage = binding.adventureItemImage;
        adventureDetailTextView = binding.adventureItemText;
        return rootView;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    private void updateContent() {
        if (adventure != null) {

            adventureDetailImage.setImageDrawable(RemoteImagesCache.getInstance().getDrawable(adventure.getPrimaryImagePath()));

            adventureDetailTextView.setText(
                    Html.fromHtml(
                            "<p><strong>Activity:</strong> " + adventure.getActivity() + "</p>"
                                    + "<p><strong>Type:</strong> " + adventure.getType() + "</p>"
                                    + "<p><strong>Trip Length:</strong> " + adventure.getTripLength() + "</p>"
                                    + "<p><strong>Group Size:</strong> " + adventure.getGroupSize() + "</p>"
                                    + "<p><strong>Difficulty:</strong> " + adventure.getDifficulty() + "</p>"
                                    + "<p><strong>Price:</strong> " + adventure.getPrice() + "</p>"
                                    + "<br/><p>" + adventure.getAdventureDescription() + "</p>" +
                                    "<br/><h3>Itinerary<h3><br/><p>" + adventure.getAdventureItinerary() + "</p>", Html.FROM_HTML_MODE_COMPACT));
            if (adventureDetailToolbar != null) {
                adventureDetailToolbar.setTitle(adventure.getTitle());
            }
        }
    }

    @NonNull
    @Override
    public Loader<Adventure> onCreateLoader(int id, @Nullable Bundle args) {
        AdventureLoader adventureLoader = new AdventureLoader(getContext(), this.itemId);
        return adventureLoader;
    }

    @Override
    public void onLoadFinished(@NonNull Loader<Adventure> loader, Adventure adventure) {
        this.adventure = adventure;
        updateContent();
    }

    @Override
    public void onLoaderReset(@NonNull Loader<Adventure> loader) {
        // nothing to do
    }
}