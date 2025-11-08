import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { JikanSearchResponse, Anime, Pagination } from '../../types';

interface AnimeState {
  animes: Anime[];
  pagination: Pagination | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  query: string;
  currentPage: number;
}

const initialState: AnimeState = {
  animes: [],
  pagination: null,
  status: 'idle',
  error: null,
  query: '',
  currentPage: 1,
};

export const fetchAnimeSearch = createAsyncThunk<
  JikanSearchResponse,
  { query: string; page: number },
  { signal: AbortSignal; rejectValue: string }
>('anime/fetchSearch', async ({ query, page }, { signal, rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}&limit=12&sfw`,
      { signal }
    );
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // try to parse error response
        const message = errorData?.message || 'Failed to fetch anime. Please try again later.';
        return rejectWithValue(message);
    }
    const data = await response.json();
    return data;
  } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('An unknown error occurred.');
  }
});


const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.currentPage = 1; // Reset page when query changes
      state.status = 'idle'; // Reset status to allow new searches
      state.animes = [];
      state.pagination = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeSearch.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchAnimeSearch.fulfilled,
        (state, action: PayloadAction<JikanSearchResponse>) => {
          state.status = 'succeeded';
          state.animes = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchAnimeSearch.rejected, (state, action) => {
        if (action.error.name === 'AbortError') {
          return;
        }
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'An unknown error occurred.';
      });
  },
});

export const { setQuery, setCurrentPage } = animeSlice.actions;

export default animeSlice.reducer;