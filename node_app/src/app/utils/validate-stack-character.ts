export function validateRequirements(stacks: Array<String>){
    return stacks.filter(stack => stack.length > 32).length == 0
}