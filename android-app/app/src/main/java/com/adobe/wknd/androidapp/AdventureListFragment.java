package com.adobe.wknd.androidapp;

import android.os.Bundle;
import android.text.Html;
import android.text.Spanned;
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
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.RecyclerView;

import com.adobe.wknd.androidapp.databinding.FragmentAdventureListBinding;
import com.adobe.wknd.androidapp.databinding.FragmentAdventureListItemContentBinding;
import com.adobe.wknd.androidapp.loader.Adventure;
import com.adobe.wknd.androidapp.loader.AdventureList;
import com.adobe.wknd.androidapp.loader.AdventuresLoader;
import com.adobe.wknd.androidapp.loader.RemoteImagesCache;
import com.google.android.material.snackbar.Snackbar;

import java.util.List;

public class AdventureListFragment extends Fragment implements LoaderManager.LoaderCallbacks<AdventureList> {

    Loader<AdventureList> adventureListLoader;
    private FragmentAdventureListBinding binding;
    private View view;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        adventureListLoader = LoaderManager.getInstance(this).initLoader(0, null, (LoaderManager.LoaderCallbacks<AdventureList>) this);
        adventureListLoader.forceLoad();

        binding = FragmentAdventureListBinding.inflate(inflater, container, false);
        return binding.getRoot();

    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        this.view = view;
    }

    private void setupViewAfterDataLoaded(View view, AdventureList data) {
        RecyclerView recyclerView = binding.itemList;

        View.OnClickListener onClickListener = itemView -> {
            Adventure item = (Adventure) itemView.getTag();
            Bundle arguments = new Bundle();
            arguments.putString(AdventureDetailFragment.ARG_ITEM_ID, item.getPath());
            Navigation.findNavController(itemView).navigate(R.id.show_item_detail, arguments);
        };

        recyclerView.setAdapter(new SimpleItemRecyclerViewAdapter(
                data.getAdventures(),
                onClickListener
        ));
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    @NonNull
    @Override
    public Loader<AdventureList> onCreateLoader(int id, @Nullable Bundle args) {
        AdventuresLoader adventuresLoader = new AdventuresLoader(getContext());
        return adventuresLoader;
    }

    @Override
    public void onLoadFinished(@NonNull Loader<AdventureList> loader, AdventureList data) {
        if (data != null) {
            setupViewAfterDataLoaded(view, data);
        } else {
            Snackbar.make(getView(), "Could not load adventures",
                    Snackbar.LENGTH_LONG)
                    .setAction("RETRY", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            Log.i("AdventuresLoader", "Retrying loading adventures...");
                            adventureListLoader.forceLoad();
                        }
                    })
                    .show();
        }

    }

    @Override
    public void onLoaderReset(@NonNull Loader<AdventureList> loader) {
        // nothing to do
    }

    public static class SimpleItemRecyclerViewAdapter
            extends RecyclerView.Adapter<SimpleItemRecyclerViewAdapter.ViewHolder> {

        private final List<Adventure> mValues;
        private final View.OnClickListener mOnClickListener;

        SimpleItemRecyclerViewAdapter(List<Adventure> items,
                                      View.OnClickListener onClickListener) {
            mValues = items;
            mOnClickListener = onClickListener;
        }

        @Override
        public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

            FragmentAdventureListItemContentBinding binding =
                    FragmentAdventureListItemContentBinding.inflate(LayoutInflater.from(parent.getContext()), parent, false);
            return new ViewHolder(binding);

        }

        @Override
        public void onBindViewHolder(final ViewHolder holder, int position) {
            Adventure adventure = mValues.get(position);

            holder.itemThumbnail.setImageDrawable(RemoteImagesCache.getInstance().getDrawable(adventure.getPrimaryImagePath()));
            Spanned s = Html.fromHtml(
                    "<p><h4>" + adventure.getTitle() + "</h4></p><br/>" +
                            "<p>" + adventure.getTripLength() + " / " + adventure.getPrice() + "</p>",
                    Html.FROM_HTML_MODE_COMPACT);
            holder.itemTextView.setText(s);
            holder.itemView.setTag(mValues.get(position));
            holder.itemView.setOnClickListener(mOnClickListener);
        }

        @Override
        public int getItemCount() {
            return mValues.size();
        }

        class ViewHolder extends RecyclerView.ViewHolder {
            final ImageView itemThumbnail;
            final TextView itemTextView;

            ViewHolder(FragmentAdventureListItemContentBinding binding) {
                super(binding.getRoot());
                itemThumbnail = binding.adventureListItemThumbnail;
                itemTextView = binding.adventureListItemHeadline;
            }

        }
    }
}