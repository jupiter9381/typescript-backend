export enum ProductStatus {
    Pending = 1, Rejected = 2, Accepted = 3
}

export enum UserType {
    vendor = 1, client = 2, delivery = 3
}

export enum AdminRequestTitle {
    CreateProduct = "create_product", EditProduct = "edit_product", EditStore = "edit_store"
}

export enum AdminRequestStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected"
}

export enum StoreStatus {
    Active, Inactive, PendingReview
}

export enum BaseUrl {
    baseUrl = "http://159.8.125.139:3000/"
}


export enum OrderStatus {
    Pending = "pending",
    InProgress = "in_progress",
    OutforDelivery = "out_for_delivery",
    Completed = "completed",
    Canceled = "canceled"
}
