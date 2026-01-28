module.exports = function(runtime, builtins, globalScope) {
    console.log("[Plugin] Loaded successfully!");
    
    // Extend builtins
    builtins.test_plugin = {
        hello: () => "Hello from Plugin!",
        add: (a, b) => a + b
    };
    
    // Define a global variable
    // runtime.global.set("PLUGIN_VERSION", "1.0.0"); // Need to check Scope API
    // Assuming runtime.global is a Scope instance
    // Scope.set(name, value, isMut)
    // runtime.global.set("PLUGIN_VERSION", "1.0.0", false);
};
