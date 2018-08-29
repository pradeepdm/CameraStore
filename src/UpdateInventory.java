import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class UpdateInventory extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
            throws IOException {

        PrintWriter out = response.getWriter();
        String rawCookie = request.getHeader("Cookie");

        String owner = "jadrn020", stringToParse = "";
        String[] a = rawCookie.split(";");
        for (String s: a){
            String[] temp = s.split("=");

            if (temp == null || temp.length <= 0){
                out.print("Unsuccessful");
                return;
            }
            String input = temp[0].trim();

            if(input.equals(owner)){
                stringToParse = temp[1].trim();
                break;
            }
        }

        String resToReturn = "success";
        String[] arr = stringToParse.split("\\|\\|");
        for (int j = 0; j < arr.length; j++) {

            if(arr[j] != ""){

                String[] pair = arr[j].split("\\|");
                String sku = pair[0];
                String quantity = pair[5];

                String getQuantity = "Select quantity from product" +
                        " WHERE sku=" + "'" + sku + "'" + ";" ;

                String result = DBHelper.doQueryForQuantity(getQuantity);
                quantity = String.valueOf((Integer.parseInt(result) - Integer.parseInt(quantity)));

                String query = "UPDATE product " +
                        "SET quantity=" + quantity +
                        " WHERE sku=" + "'" + sku + "'" + ";" ;

                DBHelper.doUpdateQuery(query);
            }
        }
        out.print(resToReturn);
    }
}