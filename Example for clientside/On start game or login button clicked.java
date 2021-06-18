                try {
                    if(Auth.login(username.getText(), uid.getText(), hwid)) {
                        loginsuccessfully = true;
                    }
                }catch(Exception e) {e.printStackTrace();}