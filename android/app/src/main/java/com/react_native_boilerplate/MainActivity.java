package com.react_native_boilerplate;
import com.reactnativenavigation.controllers.SplashActivity;
import com.facebook.react.ReactActivity;

public class MainActivity extends SplashActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "React_Native_Boilerplate";
    }
}
