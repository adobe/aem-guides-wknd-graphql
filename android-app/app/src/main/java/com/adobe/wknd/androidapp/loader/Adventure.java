package com.adobe.wknd.androidapp.loader;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Adventure implements Serializable {
    final String path;
    final String title;
    final String slug;
    final String activity;
    final String price;
    final String tripLength;
    final String difficulty;
    final String type;
    final String groupSize;
    final String description;
    final String itinerary;
    final PrimaryImage primaryImage;

    public Adventure(
            @JsonProperty(value = "_path", required = true) String path,
            @JsonProperty(value = "title", required = true) String title,
            @JsonProperty(value = "slug", required = true) String slug,
            @JsonProperty("activity") String activity,
            @JsonProperty("price") String price,
            @JsonProperty("tripLength") String tripLength,
            @JsonProperty("difficulty") String difficulty,
            @JsonProperty("adventureType") String type,
            @JsonProperty("groupSize") String groupSize,
            @JsonProperty("primaryImage") PrimaryImage primaryImage,
            @JsonProperty("description") AdventureHtml description,
            @JsonProperty("itinerary") AdventureHtml itinerary) {
        this.path = path;
        this.title = title;
        this.slug = slug;
        this.activity = activity;
        this.price = price;
        this.tripLength = tripLength;
        this.difficulty = difficulty;
        this.type = type;
        this.groupSize = groupSize;
        this.primaryImage = primaryImage;
        this.description = description != null ? description.html : null;
        this.itinerary = itinerary != null ? itinerary.html : null;
    }

    @Override
    public String toString() {
        return "[Adventure " +
                "path='" + path + '\'' +
                ", title='" + title + '\'' +
                ", slug='" + slug + '\'' +
                ", price='" + price + '\'' +
                ", tripLength='" + tripLength + '\'' +
                ", primaryImageSrc='" + getPrimaryImageSrc() + '\'' +
                ']';
    }

    public String getPrimaryImageSrc() {
        return primaryImage.dynamicUrl;
    }

    public String getPath() {
        return path;
    }

    public String getTitle() {
        return title;
    }

    public String getSlug() { return slug; }

    public String getActivity() {
        return activity;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String getType() {
        return type;
    }

    public String getGroupSize() {
        return groupSize;
    }

    public String getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getItinerary() {
        return itinerary;
    }

    public String getTripLength() {
        return tripLength;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PrimaryImage {
        final String path;
        final String dynamicUrl;

        public PrimaryImage(@JsonProperty("_path") String path, @JsonProperty("_dynamicUrl") String dynamicUrl) {
            this.path = path;
            this.dynamicUrl = dynamicUrl;
        }

        @Override
        public String toString() {
            return "[PrimaryImage " +
                    "path='" + path +'\'' +
                    "dynamicUrl='" + dynamicUrl + '\'' +
                    ']';
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AdventureHtml {
        final String html;

        public AdventureHtml(@JsonProperty("html") String html) {
            this.html = html;
        }

        @Override
        public String toString() {
            return "[AdventureHtml " +
                    "html='" + html + '\'' +
                    ']';
        }
    }
}
