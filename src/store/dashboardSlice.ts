import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SortBy = 'id' | 'title' | 'userId';

interface DashboardState {
  filterUserId: number | null;
  sortBy: SortBy;
  compactView: boolean;
  activeTab: number;
}

const initialState: DashboardState = {
  filterUserId: null,
  sortBy: 'id',
  compactView: false,
  activeTab: 0,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFilterUserId(state, action: PayloadAction<number | null>) {
      state.filterUserId = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
    },
    setCompactView(state, action: PayloadAction<boolean>) {
      state.compactView = action.payload;
    },
    setActiveTab(state, action: PayloadAction<number>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setFilterUserId, setSortBy, setCompactView, setActiveTab } = dashboardSlice.actions;
export default dashboardSlice.reducer;
