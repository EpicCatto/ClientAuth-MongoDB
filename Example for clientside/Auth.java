package urclass;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

import javax.net.ssl.HttpsURLConnection;

public class Auth {
    
    /*
     * Max.T will work on this :smile:
     * Nvm LoL i will did it
     */
            
    public static boolean login(String username, String uid, String hwid) {
        /*
         * Make Auth in here
         */
        if(username.isEmpty() || uid.isEmpty() || hwid.isEmpty())return false;
        
        
                //Login
                try {
                    URLConnection connection;
                    connection = new URL("http://AuthServer/auth/login/"+username+"-"+uid+"-"+hwid).openConnection();
                    System.out.println("http://AuthServer/auth/login/"+username+"-"+uid+"-"+hwid);
                    connection.addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");
                    BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    String currentln;
                    ArrayList response = new ArrayList();
                    while ((currentln = in.readLine()) != null) {
                        response.add(currentln);
                    }
                    
                    if(response.contains("Login Sucsess!")) {
                        User.getUserData();
                        return true;
                    }
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }


        
        return false;        
    }

}