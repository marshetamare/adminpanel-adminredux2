import { createSlice } from '@reduxjs/toolkit';

const podcastSlice = createSlice({
    name:'Podcast',
    initialState: {
        PodcastList:[
            {
                id:'',
                name:'',
                img:'',
                description:''
        }
        ],
        PodcastId: 0,
        isNewFormVisible: false,
        numberOfPodcast: 0,
        numberOfPodcastCategory:0,
        numberOfPodcastSeasons:0,
        numberOfPodcastEpisodes:0,
   },
    reducers: {
        addPodcast(state, action){
            const id =  action.payload.id;
            const name =  action.payload.name;
            const img =  action.payload.img;
            const description =  action.payload.description;
            state.PodcastList.push({id:id,name:name,img:img,description:description});
        
        },
        addPodcastCategory(state, action){
            const id =  action.payload.id;
            const name =  action.payload.name;
            const img =  action.payload.img;
            const description =  action.payload.description;
            state.PodcastList.push({id:id,name:name,img:img,description:description});

        },
        //change number of podcasts
        incrementNumberOfPodcast(state){
            state.numberOfPodcast=state.numberOfPodcast + 1;
        },
        setPodcastNumber(state, action){
            state.numberOfPodcast = action.payload;

        },
        decrementPodcastNumber(state){
            state.numberOfPodcast = state.numberOfPodcast - 1;
        },

        //change number of podcast category
        incrementNumberOfPodcastCategory(state){
            state.numberOfPodcastCategory=state.numberOfPodcastCategory + 1;
        },
        setPodcastCategoryNumber(state, action){
            state.numberOfPodcastCategory = action.payload;

        },
        decrementPodcastCategoryNumber(state){
            state.numberOfPodcastCategory = state.numberOfPodcastCategory - 1;
        },
        // end of change of podcast category

        //change number of podcast Seasons
        incrementNumberOfPodcastCategorySeasons(state){
            state.numberOfPodcastSeasons=state.numberOfPodcastSeasons + 1;
        },
        setPodcastCategorySeasonNumber(state, action){
            state.numberOfPodcastSeasons = action.payload;

        },
        decrementPodcastCategorySeasonNumber(state){
            state.numberOfPodcastSeasons = state.numberOfPodcastSeasons - 1;
        },
        // end of change of podcast Seasons
        //change number of podcast Episodes
        incrementNumberOfPodcastEpisodes(state){
            state.numberOfPodcastEpisode=state.numberOfPodcastEpisode + 1;
        },
        setPodcastEpisodeNumber(state, action){
            state.numberOfPodcastEpisode = action.payload;

        },
        decrementPodcastEpisodeNumber(state){
            state.numberOfPodcastEpisode = state.numberOfPodcastEpisode - 1;
        },
        // end of change of podcast Episodes
        toggler(state){
             state.isNewFormVisible=!state.isNewFormVisible;
        },
        editPodcast(state, action){
             state.PodcastId = action.payload;
        }
    }
})

export const podcastActions = podcastSlice.actions;
export default podcastSlice;