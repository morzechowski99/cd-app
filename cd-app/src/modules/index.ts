import main from "./main";

export const routes = [
    ...main.routes
]

export const reducers = {
    [main.name] : main.reducer
}