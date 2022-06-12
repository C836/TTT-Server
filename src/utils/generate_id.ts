export function generate_id(){
    return Math.random().toString(16).substr(2, 8);
}