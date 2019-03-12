package com.metadata.util;

import com.metadata.dto.User;

public class UserUtil {

	public String setUserName(User user) {
		String firstName = user.getFirstName();
		String lastName = user.getLastName();
		StringBuilder userName = new StringBuilder();
		if (lastName.length() > 3) {
			userName.append(lastName.substring(0, 3));
			if (firstName.length() > 2) {
				userName.append(firstName.substring(0, 2));
			} else {
				userName.append(firstName);
			}
		} else if (firstName.length() >= 6 - lastName.length()) {
			userName.append(lastName);
			userName.append(firstName.substring(0, 6 - lastName.length()-1));
		} else {
			userName.append(lastName);
			userName.append(firstName);
		}
		return userName.toString();
	}

}
