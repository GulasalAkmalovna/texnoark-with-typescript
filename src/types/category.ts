// ======================  GlobalCategory Table =====================
export interface Record extends Update {
   createdAt: string;
   image?: any;
   lastUpdateAt: string;
}

export interface Pagination {
   current: number;
   pageSize: number;
   total: undefined;
   showSizeChanger: boolean;
   pageSizeOptions: number[];
}

// ==================== MODAL ===================
export interface Update {
   id: number;
   name: string;
   parent_category_id?: number;
   description?: string;
   file?: File | string;
   categoryId: number;
   category_id: number;
   brand_id?: number;
}

export interface PropsModals {
   categories?: Record[];
   brandsData?: Record[];
   parentId?: number;
   open: boolean;
   handleClose: () => void;
   getData: () => void;
   update: Update;
}


