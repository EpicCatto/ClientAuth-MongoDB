                try {
                    if(Auth.login(username.getText(), uid.getText(), hwid)) {
                      //Do something in here like load client or load gui or smh  
                      loginsuccessfully = true;
                    }
                }catch(Exception e) {e.printStackTrace();}
