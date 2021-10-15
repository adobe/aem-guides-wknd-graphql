package com.adobe.wknd.androidapp.loader;

import androidx.annotation.NonNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class AdventureList implements Iterable<Adventure> {
    final List<Adventure> items;

    public AdventureList(@JsonProperty("items") List<Adventure> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "[AdventureList items=" + items + "]";
    }

    @NonNull
    @Override
    public Iterator<Adventure> iterator() {
        return items.iterator();
    }

    @NonNull
    public List<Adventure> getAdventures() {
        return new ArrayList<>(items);
    }


}
