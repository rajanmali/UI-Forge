import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SortBy = 'id' | 'title' | 'userId';

const PAGE_SIZE = 20;

interface DashboardState {
  filterUserId: number | null;
  sortBy: SortBy;
  compactView: boolean;
  activeTab: number;
  page: number;
}

const initialState: DashboardState = {
  filterUserId: null,
  sortBy: 'id',
  compactView: false,
  activeTab: 0,
  page: 0,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFilterUserId(state, action: PayloadAction<number | null>) {
      state.filterUserId = action.payload;
      state.page = 0;
    },
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
      state.page = 0;
    },
    setCompactView(state, action: PayloadAction<boolean>) {
      state.compactView = action.payload;
    },
    setActiveTab(state, action: PayloadAction<number>) {
      state.activeTab = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export { PAGE_SIZE };
export const { setFilterUserId, setSortBy, setCompactView, setActiveTab, setPage } = dashboardSlice.actions;
export default dashboardSlice.reducer;
