package com.adobe.wknd.androidapp.loader;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Adventure implements Serializable {
    final String path;
    final String title;
    final String activity;
    final String price;
    final String tripLength;
    final String difficulty;
    final String type;
    final String groupSize;

    final String adventureDescription;
    final String adventureItinerary;

    final PrimaryImage primaryImage;

    public Adventure(
            @JsonProperty(value = "_path", required = true) String path,
            @JsonProperty(value = "adventureTitle", required = true) String title,
            @JsonProperty("adventureActivity") String activity,
            @JsonProperty("adventurePrice") String price,
            @JsonProperty("adventureTripLength") String tripLength,
            @JsonProperty("adventureDifficulty") String difficulty,
            @JsonProperty("adventureType") String type,
            @JsonProperty("adventureGroupSize") String groupSize,
            @JsonProperty("adventurePrimaryImage") PrimaryImage primaryImage,
            @JsonProperty("adventureDescription") AdventureHtml adventureDescription,
            @JsonProperty("adventureItinerary") AdventureHtml adventureItinerary) {
        this.path = path;
        this.title = title;
        this.activity = activity;
        this.price = price;
        this.tripLength = tripLength;
        this.difficulty = difficulty;
        this.type = type;
        this.groupSize = groupSize;
        this.primaryImage = primaryImage;
        this.adventureDescription = adventureDescription != null ? adventureDescription.html : null;
        this.adventureItinerary = adventureItinerary != null ? adventureItinerary.html : null;
    }

    @Override
    public String toString() {
        return "[Adventure " +
                "path='" + path + '\'' +
                ", title='" + title + '\'' +
                ", price='" + price + '\'' +
                ", tripLength='" + tripLength + '\'' +
                ", primaryImagePath='" + primaryImage.path + '\'' +
                ']';
    }

    public String getPrimaryImagePath() {
        return primaryImage.path;
    }

    public String getPath() {
        return path;
    }

    public String getTitle() {
        return title;
    }

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

    public String getAdventureDescription() {
        return adventureDescription;
    }

    public String getAdventureItinerary() {
        return adventureItinerary;
    }

    public String getTripLength() {
        return tripLength;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PrimaryImage {
        final String path;

        public PrimaryImage(@JsonProperty("_path") String path) {
            this.path = path;
        }

        @Override
        public String toString() {
            return "[PrimaryImage " +
                    "path='" + path + '\'' +
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
