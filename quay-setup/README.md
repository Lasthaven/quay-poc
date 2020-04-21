NS=quay-enterprise
oc apply -f 1-quay-namespace.yaml
oc project $NS
oc apply -f 2-quay-secrets.yaml -n $NS
oc apply -f 3-quay-db.yaml -n $NS

oc exec -it $(oc get pod -o name -n $NS | grep quay-postgres) -n $NS -- /bin/bash -c 'echo "CREATE EXTENSION IF NOT EXISTS pg_trgm" | /opt/rh/rh-postgresql10/root/usr/bin/psql -d quay'

oc apply -f 4-quay-servieaccount.yaml -n $NS
oc adm policy add-scc-to-user anyuid -z system:serviceaccount:quay-enterprise:quay-postgres
oc adm policy add-scc-to-user anyuid system:serviceaccount:quay-enterprise:default

oc apply -f 5-quay-redis.yaml -n $NS

oc create secret generic quay-config-secret --from-file=quay-config/config.yaml --from-file=quay-config/ssl.key --from-file=quay-config/ssl.cert -n $NS
oc apply -f 6-quay-config.yaml -n $NS
oc apply -f 7-quay.yaml -n $NS
